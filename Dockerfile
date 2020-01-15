FROM ruby:2.6.5-slim-stretch

RUN apt-get update && apt-get install -y \
  curl \
  build-essential \
  libpq-dev

RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g yarn

RUN mkdir /app
WORKDIR /app

RUN node -v
RUN npm -v
RUN yarn -v

COPY Gemfile Gemfile.lock package.json yarn.lock ./

RUN gem install bundler -v 1.17.2
RUN gem install foreman -v 0.85.0
RUN bundle install --verbose --jobs 20 --retry 5
RUN yarn install --check-files

COPY . ./

EXPOSE 3000

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
