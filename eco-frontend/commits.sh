#!/bin/bash

# Define start and end dates
START_DATE="2023-12-18"
END_DATE="2024-01-14"

# Convert dates to seconds since epoch
start_sec=$(date -d "$START_DATE" +%s)
end_sec=$(date -d "$END_DATE" +%s)

# Directory to make changes (e.g., update a README file)
FILE="README.md"

# Ensure the file exists
touch $FILE

current_sec=$start_sec

while [ $current_sec -le $end_sec ]
do
    # Format the current date
    current_date=$(date -d @"$current_sec" +"%Y-%m-%d %H:%M:%S")
    
    # Make a trivial change (e.g., append the date)
    echo "Commit for $current_date" >> $FILE
    
    # Add the change to staging
    git add $FILE
    
    # Commit with the specified date
    GIT_AUTHOR_DATE="$current_date" GIT_COMMITTER_DATE="$current_date" git commit -m "Daily commit for $current_date"
    
    # Increment the day by 1
    current_sec=$((current_sec + 86400)) # 86400 seconds in a day
done
