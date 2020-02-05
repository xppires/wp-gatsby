for file in public/posts/*.html
do
 export page=${file:12}
 export postpage=${file:6}
 export pagename=${page%".html"}
  echo  "$file", "$page", "$postpage"
 sed -i "s~$postpage~${page%.html}~g" "$file"
 sed -i 's~data\\posts~data~g' "$file"
 sed -i 's/.html\\page/\\page/g' "$file"
  mv "$file" "${file%.html}"
    mkdir -p  "public$pagename/feed" &&  cp "public$pagename/index.html"  "public$pagename/feed/index.html"
 mkdir -p  "public/page-data$pagename/feed" &&  cp "public/page-data$pagename/page-data.json"  "public/page-data$pagename/feed/page-data.json"
done
#aws s3  sync public\posts  s3://www.opassoapasso.com/  --content-type text/html --acl public-read

for file in public/tag/*.html
do
  export page=${file:6}
 export postpage=${file:5}
  echo  "$file", "$page", "$postpage"
 sed -i "s~$page~${page%.html}~g" "$file"
  sed -i 's/.html\\page/\\page/g' "$file"
  mv "$file" "${file%.html}"
done

for file in public/page-data/tag/*
do
 sed -i 's/.html"/"/g' "$file"/page-data.json
 mv "$file" "${file%.html}"
done

for file in public/category/*.html
do
  export page=${file:15}
 export postpage=${file:6}
  echo  "$file", "$page", "$postpage"
 sed -i "s~$page~${page%.html}~g" "$file"
  sed -i 's/.html\\page/\\page/g' "$file"
  mv "$file" "${file%.html}"
done
for file in public/page-data/category/*
do
sed -i 's/.html"/"/g' "$file"/page-data.json
 mv "$file" "${file%.html}"
done

