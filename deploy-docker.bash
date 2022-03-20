FILE_DIR=$(dirname "$0")
DEPLOY_DIR="mintree"

cd $FILE_DIR
echo "Syncing deploy files"
rsync --progress -r --delete -a --exclude-from='.gitignore' $FILE_DIR/ $1:./$DEPLOY_DIR/
ssh $1 "cd ./$DEPLOY_DIR && docker-compose build && docker-compose push && docker stack deploy -c=docker-compose.yml --with-registry-auth mintree"