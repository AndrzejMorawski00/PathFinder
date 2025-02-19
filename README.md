
# PathFinder

 Simple app, which goal was implementation of pathfinding algorithms between two points such as BFS, Dijkstra and A* with visualisation of their performance. To write these algorithms I used my own implementations of heap and priority queue.

## Features

* **Interactive board** &rarr; users can modify the layout of the board by selecting start and end points, adding obstacles and observing how the algorithms behave.
* **Different algorithms** &rarr; user can choose 3 different algorithms:
 (A*, Dijkstra, BFS) with different heurestics, which determine how algorithms calculate shorest distance between start/end points.

* **Data structures** &rarr; app was created using my own implementation of priority queue and heap to learn and unserstand theirs basics.

## Technologies
* TypeScript
* React
* RadixUI components
* TailwindCSS

## Prerequisites

Before you begin, ensure you have the following installed:
* Docker
* Docker Compose

## Installation 

### Clone repostirory:
```
git clone https://github.com/AndrzejMorawski00/PathFinder.git
cd PathFinder
```

### Run command to build image and run docker container:

```
docker-compose up -d
```

### Stop the container

```
docker-compose down
```

## Usage
To access the application navigate to http://localhost:5173/PathFinder/
