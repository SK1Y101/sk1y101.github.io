---
layout: distill
title: January 2022
description: The first post of the new year
tags: updates
date: 2022-01-07

authors:
  - name: Jack Lloyd-Walters
    url: "https://sk1y101.github.io"

# Optionally, you can add a table of contents to your post.
# NOTES:
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - we may want to automate TOC generation in the future using
#     jekyll-toc plugin (https://github.com/toshimaru/jekyll-toc).
toc:
  - name: Short musings
  - name: A summary
  - name: Current projects
  - name: Future plans
    # if a section has subsections, you can add them as follows:
    # subsections:
    #   - name: Example Child Subsection 1
    #   - name: Example Child Subsection 2

---

## Short musings

Hi there, Welcome to my very first blog post on this site I've made for myself.

As a new year is upon us, so too is the age of resolutions and the like, a tradition I personally don't follow, nor give any precedent too.
With that said, however, I do see some wisdom in renewing the slate afresh at the turn of the year.

***

## A summary

On a somewhat related topic of the new year, the projects and achievements of the previous one, specifically in the last month since the inception of this site.

In a completely obvious first point, this very site has been built. Of course, the content is still being added (slowly), but the bare features and general layout has been completed to a degree that I am happy with.

I have also spared a little thought towards Skiylia 2.0, the updated implementation of my custom programming language using Restricted Python and the PyPy toolchain. A primary feature that I believe needs changing, beyond the basic rewritten implementation (AST's are slow), is a reimplementation of inbuilt types. Specifically, my current method of creating strings and numbers was relatively slow, and relied on multiple levels of classes to pass data around. My hope is instead to create a separate python type for Skiylia types, and utilise those single instances directly.

Alongside that, I want to implement native support for ratios, rather than relying on floats, partially due to the ease of mathematics (ie: division is now a simple inversion and multiplication operation), but also because I value my graphical calculator's ability to convert values into compacted fractions, and would quite appreciate my own language doing the same.

Of course, I put a small amount of work into Verboscript too, though mostly by way of proof of concepts. Specifically, I devoted some time to creating a quick number-to-string script in Python to test my planned feature of allowing users to type numbers, and the outcome was surprisingly effective. I heavily leveraged "The book of numbers" by Conway and Guy to generate the names for numbers larger than a Centillion, and so wrote my own recursive algorithm that can theoretically handle any sized number. (Though don't expect it to be fast when it computes the English name of an arbitrary number on the order of $$ 10 ^ 10000 $$, for example)

***

## Current projects

So what am I working on currently, and what will I be doing for the following month?

Well, university begins anew, so of course the work for that will consume a large amount of my time. Related to that, with masters projects quickly approaching, I'm also going to be spending my time performing pre-research and educating myself on the various software and programming modules that I will require for that. The masters project, as I have listed on my CV, will be concerned with exoplanetary transits, and utilising computational modelling to determine the properties of said exoplanets, So theres no shortage of coding that can be performed.

For a more hobbyist view, I've picked up my favourite game again, Kerbal Space Program. Though, with a slight twist, I'm playing with as many realism mods installed as the community has created in the last few years.
It wouldn't be one of my hobbies if there weren't an element of programming involved, and KSP is no exception. One of my favourite mods of all time, Kerbal Operating System, does exactly that: places a programming element into KSP. As such, while playing the game, I'm also developing Skiylia Operating System (Or S.O.S for short, yes I did want a humorous acronym), a decently customisable and hopefully fully autonomous flight computer that will work with N-body physics and the full extent of our solar system. No short order, but I am confident, and enjoying the challenges it poses.

***

## Future plans

And finally, some insights into more far flung ambitions. The goal is of course to complete the masters project for University, and I would absolutely love to find a new exoplanet. Realistically I will probably refine our understanding of current exoplanets, as we know of a decent number of them that we have yet to examine the properties of, though I can always hold out hope.

If anyone made it this far, thanks, this wasn't a particularly well planned collection of thoughts, but they were mine at the end of the day.
So at that, I hope you enjoy your own day!