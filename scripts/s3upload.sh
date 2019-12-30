
// aws s3 sync public\  s3://www.opassoapasso.com --exclude \"*posts/*\" --acl public-read
// aws s3  sync public\posts  s3://www.opassoapasso.com/  --content-type text/html --acl public-read

aws s3  cp  public s3://www.opassoapasso.com/ --metadata-directive REPLACE --exclude "*" --include "*app*" --include "*static/*" --include "*comm*"  --include "*webpac*" --recursive --cache-control max-age=31536000,s-maxage=31536000 --acl public-read
aws cloudfront create-invalidation --distribution-id E3LBC2AG3IA7F --paths "/static/*" "/app*" "/comm*" "/webpac*"

aws cloudfront get-invalidation --id I2J0I21PCUYOIK --distribution-id E3LBC2AG3IA7F