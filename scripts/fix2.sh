 #!/bin/bash
 for file in public/page-data/* 
 do
    if [[ -f $file ]]; 
    	then 
      		 echo "$file"
             #copy stuff ....     
        fi 
 done
