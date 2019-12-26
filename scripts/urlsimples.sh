for file in public/posts/*.html
do
 export page=${file:12}
 export postpage=${file:6}
  echo  "$file", "$page", "$postpage"
 sed -i "s~$postpage~${page%.html}~g" "$file"
  mv "$file" "${file%.html}"
done
#aws s3  sync public\posts  s3://www.opassoapasso.com/  --content-type text/html --acl public-read

