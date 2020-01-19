FROM ruby:2.6.5-buster

RUN apt-get update && apt-get install -y build-essential wkhtmltopdf

RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g yarn
RUN gem install bundler -v 1.17.2
RUN gem install foreman -v 0.85.0

RUN mkdir /app
WORKDIR /app

COPY Gemfile Gemfile.lock package.json yarn.lock ./
RUN bundle install --verbose --jobs 20 --retry 5
RUN yarn install --check-files

RUN npm rebuild node-sass

COPY . ./

EXPOSE 3000

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
