#!/bin/bash
set -e

bundle exec rake tmp:clear db:migrate

bundle exec rails server -b 0.0.0.0
