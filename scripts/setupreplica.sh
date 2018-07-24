#!/bin/bash

function waitForMongo {
    n=0
    until [ $n -ge 20 ]
    do
        mongo --host mongo1:27017 --quiet --eval "db" && break
        n=$[$n+1]
        sleep 2
    done
}

echo "Waiting for startup.."
waitForMongo mongo1 27017
echo "Started.."

sleep 10
# from https://github.com/yeasy/docker-compose-files
echo setup.sh time now: `date +"%T" `
mongo --quiet --host mongo1:27017 <<EOF
   var cfg = {
    "_id": "rs",
      "members": [{
        "_id": 0,
        "host": "mongo1:27017"
      }]
    };
    rs.initiate(cfg, { force: true });
EOF

tail -f /dev/null
