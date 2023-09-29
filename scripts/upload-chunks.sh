#!/bin/sh

printf "$WHITE\nupload docs to s3 and invalidate cloudfront\n$NC"

bucket=s3://link-moa
distribution_id=E2XXZQY2502TUR

aws s3 rm $bucket/.next/static --recursive --profile sooohka || {
	echo "${RED}remove old bundle failed$NC"
	exit 1
}
aws s3 cp .next/static $bucket/_next/static --recursive --profile sooohka || {
	echo "${RED}upload failed$NC"
	exit 1
}
aws cloudfront create-invalidation --distribution-id $distribution_id --paths "/*" --profile sooohka | > trash || {
	echo "$RED invalidation failed$NC"
	exit 1
}

# 배포로직