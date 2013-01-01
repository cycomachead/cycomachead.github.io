---
layout: post
category: blog
title: Some Tips on Metadata in Aperture 3
tags: [aperture, mac, tips, metadata, hack, blog, aperture3, presets, photography]
date: 2012-03-31 20:25:00
---

Recently, I had a problem where my entire autofill list disappeared from Aperture. Yikes! I've got a few years of metadata saved in there. So here's some things I've learned from the process:

<!--more-->

<ol>
        <li>All your autofill data is stored in your main Aperture preferences file, <code>com.Apple.Aperture.plist</code> in ~/Library/Preferences</li>

        <li>Each metadata item is sorted as an array with your auto-complete data stored as items in that array as strings.  You can manually edit the prefs file with no ill effects if you'd like. (Perhaps using Find and Replace to correct a few common metadata differences or some other errors.) If you do make changes to the file, make sure Aperture is closed so it doesn't over write your changes when it saves.</li>

        <li>If your autofill list does disappear: Restore an old version of your preferences file. To do this, you'll need some sort of a backup.

            <ul>
                <li>If you have Time Machine, navigate to ~/Library/Preferences and then enter Time Machine backups, go back a couple days and then select the <code>com.Apple.Aperture.plist</code> file and click restore</li>

                <li>If you have any other backup try to find wherever you would have ~/Library/Preferences saved</li>

                <li>You MAY need to change the permissions on your preferences file. To do this, in Finder open the Info window for the prefs file and move down to section that says "Sharing and Permissions" and make sure your user account says "Read and Write". If it doesn't, click the lock to put in your password, then click the plus to add your account and select "Read and Write" once it's been added.</li>
            </ul>
        </li>
</ol>


### Multiple Libraries

Storing the Autofill items in the User preferences folder is interesting.  This means it's tied to your User Account and _not_ a particular library, so here's some things to consider.

* If you work with different libraries on the same user account, they will have the same auto-complete data. (This may not be bad depending on how you work).

* If you work with _one_ Library on two different accounts or computers (say a mobile device and a main machine) then you will need to &#8220;sync&#8221; the preferences files (via manual copy and paste) in order to have the same auto-complete data — if that matters to you.

### Metadata Presets ###

* Items saved in Metadata Presets aren't related to auto-complete at all (at a settings level). If you lose your preferences, then your metadata presets should be completely intact. (They're saved in ~/Library/Application Support/Aperture). Items which are saved in a metadata preset are _not_ added to your auto-complete list when they are used. However, if you change the data in the in the preset while importing, using the metadata pane, or while batch processing, then it will be added to the auto-complete list. Essentially, if you change the actual metadata preset (via the edit interface) then it changes the preset, but not the autofill list, but if you modify a preset on the fly then it treats that metadata field differently and will add it to the autocomplete list.

Well, I hope some of these findings help someone in the future!
