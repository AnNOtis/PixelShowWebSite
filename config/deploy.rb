# config valid only for current version of Capistrano
lock '3.3.5'
set :application, 'pixelshow'
set :repo_url, 'git://github.com/AnNOtis/PixelShowWebSite.git'

# Default branch is :master
ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }.call

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, '/home/deploy/pixelshow'
set :default_env, { rvm_bin_path: '/usr/local/rvm/bin' }
# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
set :linked_files, %w{ config/database.yml config/application.yml }

# Default value for linked_dirs is []
set :linked_dirs, %w{ bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system }

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
set :keep_releases, 5

namespace :deploy do

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      execute :touch, release_path.join('tmp/restart.txt')
    end
  end

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end
  after :publishing, 'deploy:restart'
  after :finishing, 'deploy:cleanup'

end
