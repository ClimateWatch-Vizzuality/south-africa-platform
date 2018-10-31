#!/bin/bash
set -e

case "$1" in
    
    start)
        echo "Running Start"
        bundle exec rake tmp:clear db:migrate
        exec bundle exec rails server -b 0.0.0.0
        ;;
    sidekiq)
        echo "Running sidekiq"
        exec bundle exec sidekiq
        ;;
    *)
        exec "$@"
esac
