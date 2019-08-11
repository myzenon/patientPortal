#!/bin/bash

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
bucket_name=`cat /opt/arine/config.properties | grep sdk.bucket | cut -d= -f2`
echo "will use ${bucket_name} as S3 bucket"

echo 'copy to S3 bucket'
out_folder=`date +%Y%m%d%H%M%S`-arine-pp-prod
key=patient-portal
if [ "${TARGET_ENV}" == "STAGE" ]
then
	key=patient-portal-stage
fi

s3_target="${bucket_name}/${key}/${out_folder}"
echo "will deploy patient portal package to: ${s3_target}"

aws s3 cp --recursive build s3://${s3_target}/

if [ $venv -gt 0 ]
then
	deactivate
	echo "virtual env deactivated"
fi
