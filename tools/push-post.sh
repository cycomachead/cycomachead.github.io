# do the work to actually push a post to gh.

cd ~/Dropbox/Projects/Website
git checkout source
jekyll
git add *
git commit -a -m "Added new post"
git push
cp -rf _site/* ../michaelballphoto.com
cd ../michaelballphoto.com
git add *
git commit -a -m "Added new post to complied repo"
git push