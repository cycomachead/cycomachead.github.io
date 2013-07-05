# do the work to actually push a post to gh.
if [ -z "$1" ]
    then
        msg="Added post to compiled repo"
    else
        msg="$1"
fi

cd ~/Dropbox/Projects/Website
cp -f "~/Dropbox/Docs and Apps/Resumes/Resume.pdf" .
jekyll
git add *
git commit -am "Added new post"
git push
rsync -avz _site/* ../michaelballphoto.com/
cd ../michaelballphoto.com
git add *
git commit -am "$msg"
git push