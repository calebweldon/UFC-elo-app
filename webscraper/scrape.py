import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
from datetime import datetime

########## HELPER FUNCTIONS ###########

def get_links():
    url = "http://www.ufcstats.com/statistics/events/completed?page=all"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    table = soup.find("table", "b-statistics__table-events")
    links = table.find_all('a')
    links = [l.get("href") for l in links if l.get("href")]

    if links and "event-details" not in links[0]:
        links = links[1:]

    return links

## 
def parse_event(url, fights, events):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    ## event name
    event_name = soup.find("h2", "b-content__title").get_text(strip=True)
    list_items = soup.find_all("li", class_="b-list__box-list-item")
    for item in list_items:
        label, val = item.get_text(strip=True).split(":")
        if label == "Date":
            event_date = val.strip()
        elif label == "Location":
            event_location = val.strip()

    event = {
        "event": event_name,
        "date": datetime.strptime(event_date, "%B %d, %Y").strftime("%m/%d/%Y"),
        "location": event_location
    }
    events.append(event)

    table = soup.find("tbody")
    for row in table.find_all("tr"):
        data = row.find_all("td")

        result = "".join(data[0].text.strip().split())
        if result == "ncnc":
            result = "nc"
        elif result == "drawdraw":
            result = "draw"

        fighter_1 = data[1].find_all("p")[0].text.strip()
        fighter_2 = data[1].find_all("p")[1].text.strip()
        weight_class = data[6].text.strip()
        method = " ".join(data[7].text.strip().split())
        round = data[8].text.strip()
        round_time = data[9].text.strip()

        fight = {
            "event": event_name,
            "fighter_1": fighter_1,
            "fighter_2": fighter_2,
            "result": result,
            "weight_class": weight_class,
            "method": method,
            "round": int(round),
            "time": round_time
        }

        fights.append(fight)

    time.sleep(1)
    

########## MAIN ###########

def main():
    fights = []
    events = []
    links = get_links()[1:]
    for link in links:
        parse_event(link, fights, events)

    fights_df = pd.DataFrame(fights)
    fights_df.to_csv("data/ufcfights.csv", index=False)

    events_df = pd.DataFrame(events)
    events_df.to_csv("data/ufcevents.csv", index=False)


if __name__ == "__main__":
    print("starting scrape")
    main()

