import pandas as pd
import numpy as np
from collections import defaultdict

########## CONSTANTS ###########
INITIAL_ELO = 1000
K_FACTOR = 200

########## MATH FUNCTIONS ###########
def get_k(method, base_k=K_FACTOR):
    if method in ("U-DEC", "S-DEC"):
        return base_k
    else:
        return base_k * 1.15
        
def calc_expected(a, b):
    return 1 / (1 + 10**((b - a) / 400))

def update_elo(winner_elo, loser_elo, k_factor):
    expected_win = calc_expected(winner_elo, loser_elo)
    winner_elo = winner_elo + k_factor * (1 - expected_win)
    loser_elo = loser_elo + k_factor * (0 - (1 - expected_win))
    return (round(winner_elo, 2), round(loser_elo, 2))

########## SCHEMA FUNCTIONS ###########
def organize_fighters(elo_ratings, fighter_map, records):
    fighters = []
    for fighter, elo in elo_ratings.items():
        record = records[fighter]

        f = {
            "fighter_id": fighter_map[fighter],
            "name": fighter,
            "current_elo": elo[-1],
            "peak_elo": max(elo),
            "wins": record[0],
            "losses": record[1],
            "draws": record[2],
            "ncs": record[3],
        }
        fighters.append(f)

    fighters_df = pd.DataFrame(fighters)
    fighters_df.to_csv("data/fighters_output.csv", index=False)

def organize_fights(transformed_rows):
    transformed_df = pd.DataFrame(transformed_rows)
    order = ['fight_fighter_id'] + list(transformed_df.columns)
    transformed_df['fight_fighter_id'] = np.arange(1, len(transformed_df) + 1)
    transformed_df = transformed_df[order]
    transformed_df.to_csv("data/fights_output.csv", index=False)

def organize_events(ufcevents):
    events_df = pd.DataFrame(ufcevents)
    order = [
        "event_id",
        "event",
        "date",
        "location"
    ]
    events_df = events_df[order]
    events_df.to_csv("data/events_output.csv", index=False)

########## ENGINE ###########
def process_fights(ufcfights, ufcevents):
    ## initialize elo for fighters
    elo_ratings = {}
    records = {}

    ## load CSV
    ufcfights = ufcfights.reset_index()
    ufcfights = ufcfights.sort_index(ascending=False)

    ## add event index and merge
    ufcevents["event_id"] = np.arange(1, len(ufcevents) + 1)
    ufcfights = ufcfights.merge(ufcevents[['event', 'event_id']], on='event')

    ## create player_ids
    fighters = pd.concat([ufcfights['fighter_1'], ufcfights['fighter_2']]).unique()
    fighter_map = { fighter: i for i, fighter in enumerate(fighters, start=1)}
    ufcfights['fighter1_id'] = ufcfights['fighter_1'].map(fighter_map)
    ufcfights['fighter2_id'] = ufcfights['fighter_2'].map(fighter_map)


    transformed_rows = []
    for _, row in ufcfights.iterrows():
        fighter_1 = row["fighter_1"]
        fighter_2 = row["fighter_2"]

        if fighter_1 not in elo_ratings:
            elo_ratings[fighter_1] = [INITIAL_ELO]
            records[fighter_1] = [0,0,0,0]
        if fighter_2 not in elo_ratings:
            elo_ratings[fighter_2] = [INITIAL_ELO]
            records[fighter_2] = [0,0,0,0]


        fighter_1_starting_elo = elo_ratings[fighter_1][-1]
        fighter_2_starting_elo = elo_ratings[fighter_2][-1]

        method = row["method"]
        k_factor = get_k(method)

        result = row["result"]
        if result == "win":
            new_fighter_1, new_fighter_2 = update_elo(fighter_1_starting_elo, fighter_2_starting_elo, k_factor)
            records[fighter_1][0] += 1
            records[fighter_2][1] += 1
        elif result == "draw":
            new_fighter_1, new_fighter_2 = update_elo(fighter_1_starting_elo, fighter_2_starting_elo, k_factor / 2)
            records[fighter_1][2] += 1
            records[fighter_2][2] += 1
        elif result == "nc":
            new_fighter_1, new_fighter_2 = fighter_1_starting_elo, fighter_2_starting_elo
            records[fighter_1][3] += 1
            records[fighter_2][3] += 1
        else:
            new_fighter_1, new_fighter_2 = update_elo(fighter_2_starting_elo, fighter_1_starting_elo, k_factor)
            records[fighter_1][1] += 1
            records[fighter_2][0] += 1

        elo_ratings[fighter_1].append(new_fighter_1)
        elo_ratings[fighter_2].append(new_fighter_2)

        # Fighter 1 perspective
        row_fighter1 = {
            "event_id": row["event_id"],
            "fighter_id": row["fighter1_id"],
            "opponent_id": row["fighter2_id"],
            "result": row["result"],
            "fighter_pre_elo": fighter_1_starting_elo,
            "fighter_post_elo": new_fighter_1,
            "opponent_elo": fighter_2_starting_elo,
            "weight_class": row["weight_class"],
            "method": row["method"],
            "round": row["round"],
            "time": row["time"],
        }
        transformed_rows.append(row_fighter1)

        # Fighter 2 perspective
        fighter2_result = (
            "win" if row["result"] == "loss" else
            "loss" if row["result"] == "win" else
            row["result"]
        )
        row_fighter2 = {
            "event_id": row["event_id"],
            "fighter_id": row["fighter2_id"],
            "opponent_id": row["fighter1_id"],
            "result": fighter2_result,
            "fighter_pre_elo": fighter_2_starting_elo,
            "fighter_post_elo": new_fighter_2,
            "opponent_elo": fighter_1_starting_elo,
            "weight_class": row["weight_class"],
            "method": row["method"],
            "round": row["round"],
            "time": row["time"],
        }
        transformed_rows.append(row_fighter2)

    return transformed_rows, elo_ratings, fighter_map, records


def main():
    ufcfights = pd.read_csv("data/ufcfights.csv", index_col=0)
    ufcevents = pd.read_csv("data/ufcevents.csv")
    
    transformed_rows, elo_ratings, fighter_map, records = process_fights(ufcfights, ufcevents)

    organize_events(ufcevents)
    organize_fighters(elo_ratings, fighter_map, records)
    organize_fights(transformed_rows)

if __name__ == "__main__":
    main()







