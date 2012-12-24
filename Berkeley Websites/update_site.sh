#! /bin/bash


# Script tp update the site for a new page. 
# Will Create the Folder in the current directory and then use scp to copy it over

#Variables
class=""
classaccount=""
semester=""
year=""
job=""
section=""
semshort=""
template="generic about.html"
hw0="HW0 Template.txt"

echo "Please enter the class name: "
read class
echo "Please enter your class-account: "
read classaccount
echo "Please enter the semester: "
read semester
echo "Please enter the year: "
read year
echo "Please enter your job (reader, TA, student): "
read job
echo "Please enter your section number: "
read section
echo "Please enter the short name for the semester (Su12, etc): "
read semshort

new_dir=${class}-${semshort}
mkdir $new_dir
mkdir $new_dir/public_html
cp $template $new_dir/public_html/index.html
cp $hw0 $new_dir/public_html/hw0.txt
cp main.css $new_dir/public_html/main.css
chmod 755 $new_dir/public_html
cd $new_dir
for f in public_html; do
	chmod 655 $f
	sed -n 's/[CLASS]/${class}/g' $f
	sed -n 's/[CLASS-ACCOUNT]/${classaccount}/g' $f
	sed -n 's/[SEMESTER]/${semester}/g' $f
	sed -n 's/[YEAR]/${year}/g' $f
	sed -n 's/[JOB]/${job}/g' $f
	sed -n 's/[SECTION]/${section}/g' $f
done 
mate hw0.txt