---
layout: post
category: blog
title: Round Tripping with ACR and Aperture 3
tags: [aperture, ACR, adobe, raw, macs, cameras, photography, editing, photoshop, round tripping, aperture 3, AP3]
date: 2012-06-11 14:27:00
---


<img src="http://media.tumblr.com/tumblr_m5g0uphwpB1qjg6k8.png" width="150" height="150" align="left" alt=""/>Aperture has long made it easy to round-trip with an external editor. That is, if you want to edit an image in Photoshop or GIMP, then all you need to do is right click the image from within Aperture, and it will open in your desired editor and when it’s saved, the image is automatically in your Aperture library, right alongside its original version. However, open files in Adobe Camera Raw has takes a bit more configuring. The reason is that when Aperture round trips, it creates a new file from the master, and ACR will only open files under certain conditions, and it won’t open PSD files.

If you want to use ACR with Aperture round tripping here’s what you need to do:


1. Open your Aperture preferences and go to “Export”. Then set your Aperture External Editor preference to Photoshop, and then set the file format to TIFF 16-bit. (I suppose 8-bit may work, but that would defeat the purpose of using ACR). <img src="http://media.tumblr.com/tumblr_m5g0lnHM8l1qjg6k8.png" width="260" height="200" alt=""/><br/>

2. In Photoshop open your preferences, and go to the “File Handling” tab, then select “Camera Raw Preferences…”<img src="http://media.tumblr.com/tumblr_m5g0me3aDX1qjg6k8.png" width="477" height="359" alt=""/>

3. Change the TIFF settings to say “Automatically open all supported TIFFs” Click OK and you’re good to go!<img src="http://media.tumblr.com/tumblr_m5g0mrb6TN1qjg6k8.png" width="341" height="355" alt=""/>


Yes, now every time you round trip you will be presented with the ACR dialogue. For me, this is great because there are a few ACR options I really like. If you’d like to temporarily change your preference, then you can simply set Aperture to use PSDs which ACR won’t open. As far as the difference between PSD and TIFF - there’s not too much difference as both support layers. My personal preference leans towards TIFF as it has a larger max file size and is an open standard.
