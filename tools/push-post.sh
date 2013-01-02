# do the work to actually push a post to gh.
if [ -z "$1" ]
    then
        msg="Added post to compiled repo"
    else
        msg="$1"
fi

cd ~/Dropbox/Projects/Website
jekyll
git add *
git commit -a -m "Added new post"
git push
cp -r _site/* ../michaelballphoto.com/
cd ../michaelballphoto.com
git add *
git commit -a -m "$msg"
git push