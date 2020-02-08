
#// aws s3 sync public\  s3://www.opassoapasso.com --exclude \"*posts/*\" --acl public-read
#// aws s3  sync public\posts  s3://www.opassoapasso.com/  --content-type text/html --acl public-read

#aws s3  cp  public s3://www.opassoapasso.com/ --metadata-directive REPLACE --exclude "*" --include "*app*" --include "*static/*" --include "*comm*"  --include "*webpac*" --recursive --cache-control max-age=31536000,s-maxage=31536000 --acl public-read
#aws cloudfront create-invalidation --distribution-id E3LBC2AG3IA7F --paths "/static/*" "/app*" "/comm*" "/webpac*"

#aws cloudfront get-invalidation --id I2R0CU9W65ON35 --distribution-id E3LBC2AG3IA7F

export fullpaht=$(pwd)
echo "$fullpaht"
for file in public/tag/*
do
  export page=${file:11}
  if [[ $file == *"htm"* ]]; then
  continue
fi
  echo "$file  $page  s3://www.opassoapasso.com/tag/$page/feed/index.html"
  "/c/Program Files/Amazon/AWSCLI/bin/aws.cmd" s3  cp "public/tag/$page"  "s3://www.opassoapasso.com/tag/$page/feed/index.html"  --content-type text/html --acl public-read
  "/c/Program Files/Amazon/AWSCLI/bin/aws.cmd" s3  cp "public/page-data/tag/$page/page-data.json"  "s3://www.opassoapasso.com/page-data/tag/$page/feed/page-data.json"  --content-type text/html --acl public-read
done