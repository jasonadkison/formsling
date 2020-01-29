FROM ruby:2.6.5-buster

ARG RAILS_ENV=production
ARG NODE_ENV=production

RUN apt-get update && apt-get install -y build-essential

RUN wget -qO- https://github.com/wkhtmltopdf/wkhtmltopdf/releases/download/0.12.4/wkhtmltox-0.12.4_linux-generic-amd64.tar.xz | tar Jxvf - -C /root && \
    mv /root/wkhtmltox/bin/wkhtmlto* /usr/bin/ && \
    rm -rf /root/wkhtmlto*

RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g yarn
RUN gem install bundler -v 1.17.2

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle check || bundle install --without development test --jobs=4

COPY package.json yarn.lock ./
RUN yarn install --check-files

RUN npm rebuild node-sass

COPY . ./

ENV RAILS_ENV ${RAILS_ENV}
ENV RACK_ENV ${RAILS_ENV}
ENV NODE_ENV ${NODE_ENV}

EXPOSE 3000
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
