#!/bin/bash -x

script_dir=`dirname $0`
version=$1

# Must be in top dir before calling git commands
cd $script_dir/..

if [ "$version" == '' ]; then
  echo "Missing version"
  echo " "
  echo "Usage:"
  echo "./bin/release_to_prod.sh <version>"
  echo "Example:"
  echo "Usage:"
  echo "./bin/release_to_prod.sh release-20180705"
  echo " "
  exit 1
fi

# Print current commit hash
git log --pretty=format:'%H' -n 1

# Create a release branch from dev
git checkout dev
git pull
git checkout -b $version
git push origin $version

# Merge the release branch to master. Run git tag for akesocloud and patientPortal.
git checkout master
git pull
git merge --no-ff origin/$version
git push origin master
git tag -a $version

