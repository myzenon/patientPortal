#!/bin/bash -x

venv_dir=/var/lib/jenkins/python_env
venv=0
if [ -d "${venv_dir}" ]
then
	source ${venv_dir}/bin/activate
    venv=1
    echo "virtual env activated"
else
    echo "no virtual env found"
fi

function LOG
{
    msg=$1
    echo "${msg}"
}

echo "cur dir = $PWD"
project_dir=$PWD

LOG "reading S3 bucket from config"
s3_bucket=`cat /opt/arine/config.properties | grep sdk.bucket | cut -d= -f2`
if [ -z "${s3_bucket}" ]
then
    LOG "Failed to read S3 bucket name from config"
    exit 1
fi

LOG "will downlong SDK from ${s3_bucket} bucket"

version_file=`cat /opt/arine/config.properties | grep sdk.version.file | cut -d= -f2`
LOG "reading last sdk version from file"
if [ ! -f ${version_file} ]
then
    LOG "version file ${verion_file} was not found"
    exit 1
fi

version=`cat ${version_file}`
LOG "importing version:${version}"
#aws s3 cp s3://${s3_bucket}/${version} /tmp/
aws s3 cp s3://${s3_bucket}/${version} .
if [ $? -ne 0 ]
then
    LOG "Failed to download sdk zip file"
    exit 1
fi
sdk_file=`echo $version | cut -d/ -f2`
LOG "unzipping sdk package"
#unzip /tmp/${sdk_file}
unzip ${sdk_file}

package_name=$project_dir/apiGateway-js-sdk
package_folder=$project_dir/aws-api

# Make sure aws-api dir exists
if [ ! -d ${package_folder} ]; then
    LOG "creating package folder ${package_folder}"
    mkdir ${package_folder}
fi

# Deleting old sdk dir
if [ -d ${package_folder}/sdk ]; then
    LOG "Deleting old sdk folder ${package_folder}/sdk"
    rm -rf ${package_folder}/sdk
fi

LOG "moving ${package_name} to ${package_folder}/sdk"
#mv ${package_name} ${package_folder}/sdk
cp -r ${package_name} ${package_folder}/sdk

# Build and save in src/libs/awsapi
npm install concat-files
yarn run awsapi

if [ $venv -gt 0 ]
then
	deactivate
	echo "virtual env deactivated"
fi

LOG "DONE"
