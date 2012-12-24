cd ~/Dropbox/Projects/Website/_posts/tumblr/

for file in *
do
    tail -n +3 $file > tmp
    mv tmp $file
    echo "---" > tmp
    cat $file >> tmp
    mv tmp $file
done