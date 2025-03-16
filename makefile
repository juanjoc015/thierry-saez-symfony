# —— Inspired by ———————————————————————————————————————————————————————————————
# http://fabien.potencier.org/symfony4-best-practices.html
# https://speakerdeck.com/mykiwi/outils-pour-ameliorer-la-vie-des-developpeurs-symfony?slide=47
# https://blog.theodo.fr/2018/05/why-you-need-a-makefile-on-your-project/

# Setup ————————————————————————————————————————————————————————————————————————

# Executables
SYMFONY       = symfony
PHP           = $(SYMFONY) php
COMPOSER      = $(SYMFONY) composer
CONSOLE       = $(SYMFONY) console
DOCKER		  = docker

DOMAIN		  = $(shell $(SYMFONY) var:export SYMFONY_DEFAULT_ROUTE_URL)

# Misc
.DEFAULT_GOAL = help
.PHONY       =  # Not needed here, but you can put your all your targets to be sure
                # there is no name conflict between your files and your targets.

## —— 🐝 The Symfony Makefile 🐝 ———————————————————————————————————
help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

## —— Project 🚀  ————————————————————————————————————————————————————————
start: docker-up serve composer-install security info ## Start Symfony binary server, install composer, fix permissions and build JS assets

stop: unserve docker-stop  ## Stop Symfony binary server

clean: stop # Remove Docker container, Composer vendors, Yarn node_modules, Symfony var directory (cache, logs, uploaded files), Symfony public assets
	$(DOCKER) compose down --remove-orphans
	rm -rf vendor
	rm -rf node_modules
	rm -rf var
	rm -rf public/assets public/bundles public/media
	rm -rf yarn-error.log npm-debug.log .phpunit.result.cache .php_cs.cache

status:
	$(SYMFONY) server:status

info:
	@echo ============================================================================
	@echo PhpMyAdmin UI - Manage/View MySql datas     :     http://127.0.0.1:7801
	@echo ----------------------------------------------------------------------------
	@echo Mailhog UI    - Email smtp for tests        :     http://127.0.0.1:7803
	@echo ----------------------------------------------------------------------------
	@echo WEB UI        - Application                 :     ${DOMAIN}
	@echo ----------------------------------------------------------------------------
	@echo ADMIN UI      - Administration              :     ${DOMAIN}admin
	@echo ============================================================================

## —— Docker 🐳 ————————————————————————————————————————————————————————————————
docker-up: ## Start the docker hub (MySQL, Elasticsearch)
	$(DOCKER) compose --env-file .env.local up -d --build

docker-stop: ## Stop the docker hub
	$(DOCKER) compose stop

## —— Composer 🧙‍♂️ ————————————————————————————————————————————————————————————
composer-install: composer.lock ## Install vendors according to the current composer.lock file
	$(COMPOSER) install

composer-update: composer.lock ## Update vendors to last version
	$(COMPOSER) update

## —— Symfony 🎵 ———————————————————————————————————————————————————————————————
serve: ## Serve the application with HTTPS support
	$(SYMFONY) server:start --daemon

unserve: ## Stop the webserver
	$(SYMFONY) server:stop

cc: ## Clear the cache. DID YOU CLEAR YOUR CACHE????
	$(CONSOLE) c:c

permissions: ## Fix permissions of all var files
	chmod -R 777 var/*

db-create: ## Create the database
	@while ! docker-compose exec db mysqladmin ping -h localhost -u symfony_user -psymfony_password --silent; do \
		sleep 1; \
	done
	$(CONSOLE) doctrine:database:create --if-not-exists

## —— Quality insurance ✨ ——————————————————————————————————————————————————————
check: requirements security lint ## Run all coding standards checks

requirements:
	$(SYMFONY) check:req

security:
	$(SYMFONY) security:check

## —— Deploy ✨ ——————————————————————————————————————————————————————
deploy:
	git pull
	$(COMPOSER) install
	$(CONSOLE) sass:build
	$(CONSOLE) fos:js-routing:dump --target=assets/js/routes/routes.json --format=json
	$(CONSOLE) asset-map:compile
	$(CONSOLE) d:m:m -n
	$(CONSOLE) c:c
	$(CONSOLE) c:w
	chmod -R 777 var/*
	chmod -R 777 public/*

## —— 🐱 JavaScript —————————————————————————————————————————————————————

js-routing: ## Rebuild the JS routes
	$(CONSOLE) fos:js-routing:dump --target=assets/js/routes/routes.json --format=json