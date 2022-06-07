---
layout: distill
title: Masters Thesis
permalink: /_unlisted/TransitProjectPaper/
longtitle: Determining The Parameters of Exoplanetary Candidates From Transit Timing Variations
description: >
  <p>Searching for Transit Timing Variations to determine the parameters of additional exoplanets in a system.</p>
  <p>astronomical databases: miscellaneous -- software: development -- software: simulations -- techniques: photometric</p>
img: assets/img/TransitProject/TTVModelAnimation.gif
importance: 1
github:
  user: SK1Y101
  repo: TransitProject
  onpage: true
  showbadges: false
  contributors: true
category: work
date: 2022-05-24

authors:
  - name: Jack Lloyd-Walters
    url: "https://sk1y101.github.io"
    affiliations:
      name: Royal Astronomical Society, University of Portsmouth
  - name: Stephen Futcher
    affiliations:
      name: Royal Astronomical Society, Hampshire Astronomical Group
  - name: Daniel Thomas
    affiliations:
      name: University of Portsmouth
  - name: Hooshyar Assadullahi
    affiliations:
      name: University of Portsmouth

links:
  pdf: TransitProject/TransitDissertation.pdf
  url:

# Optionally, you can add a table of contents to your post.
# NOTES:
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - we may want to automate TOC generation in the future using
#     jekyll-toc plugin (https://github.com/toshimaru/jekyll-toc).

bibliography: transitproject.bib

toc:
  - name: Abstract
  - name: Introduction
    subsections:
      - name: Transit photometry
      - name: Transit timing
        subsections:
        - name: Barycentre motion
        - name: Orbital perturbation
        - name: mean motion libration
      - name: Project objectives
  - name: Methodology
    subsections:
      - name: TTV Models
        subsections:
          - name: Interior perturbation
            subsections:
              - name: Initial derivation
              - name: Extension to eccentric orbits
          - name: Exterior perturbation
      - name: Parameter search
        subsections:
          - name: Optimisation
            subsections:
              - name: Least squares regression
              - name: Maximum likelihood
              - name: Minimisation
          - name: Model comparison
            subsections:
              - name: Akaike information criterion
              - name: Corrected Akaike information criterion
              - name: Bayesian information criterion
          - name: Markov Chain, Monte Carlo
  - name: Results / Discussion
    subsections:
      - name: Observations
      - name: Light curve analysis
        subsections:
          - name: De-trending
          - name: Transit fitting
          - name: TTV Residuals
      - name: Simulation pipeline
        subsections:
          - name: Initialisation
          - name: Simulated TTV
      - name: Analytical Models
        subsections:
          - name: System and TTV
          - name: Model comparison
          - name: Parameter optimisation
          - name: Model selection
          - name: Most likely system
      - name: Discussion
        subsections:
          - name: Evaluation
          - name: Limitations
          - name: Errors
  - name: Conclusion
  - name: Acknowledgements
  - name: Data Availability
  - name: Extra material
    subsections:
    - name: Transit duration derivation

# Below is an example of injecting additional post-specific styles.
# If you use this post as a template, delete this _styles block.

---
{% capture figurenums %}{% increment figure_num %}{% increment equation_num %}{% increment table_num %}{% endcapture %}

# Abstract
Transit Timing Variation (TTV) provides a powerful tool to probe the dynamical configuration of exoplanetary systems from historical transit data <d-cite key="firstTTVPaper"></d-cite>;<d-cite key="secondTTVPaper"></d-cite>. TTV analysis has allowed both verification of planetary parameters <d-cite key="TrappistMass"></d-cite> and the discovery of new planetary bodies <d-cite key="Keplerc"></d-cite> from transit observation alone.
As part of this work, additional transit light curves have been collected with the 24" Ritchey-Chrétien telescope at Clanfield observatory and combined with the ExoClock database <d-cite key="ExoClockI"></d-cite>;<d-cite key="ExoClockII"></d-cite>, Exoplanet transit database <d-cite key="ETD"></d-cite>, and *TESS* light curves <d-cite key="tess"></d-cite> to create a set of historical TTV data for analysis.
A set of extensible TTV models have been developed to analytically approximate the chaotic n-body nature of real planetary systems. A computational pipeline to automate model fitting using various parameter optimisation <d-cite key="diffEvo"></d-cite>;<d-cite key="dualAnnealing"></d-cite> and model comparison <d-cite key="AIC"></d-cite>;<d-cite key="AIC2"></d-cite>;<d-cite key="AICC"></d-cite>;<d-cite key="BIC"></d-cite> techniques has been developed in-situ, allowing verification of model validity and analysis of TTV candidates using a combination of simulation and historical TTV data.
The models developed were found to accurately describe TTV, and could determine the initial system parameters of simulated TTV systems to reasonable accuracy.
Future work will allow extensions to these models, providing a more powerful suite of analytical tools for exoplanetary science, and the application of these methods to real exoplanetary systems with the possibility of new planetary discoveries.

# Introduction

In the last quarter-century, exoplanet detections have seen astronomical success, in no small part due to the launch of several space bourne telescopes. Of the 5000 planets found within 3800 planetary systems, around three quarters have been discovered through transit photometry <d-cite key="exoplanetArchive"></d-cite>. To this day, over 130 million light curves have been observed, providing a large base for historical analysis.

Of particular interest for this project is a specific subset of transit photometry that makes heavy use of this historical data. ``Transit Timing Variation'', or ``TTV'', reanalyses historical transit observations for deviation from 2-body Keplerian motion to provide an insight into the dynamics of an exoplanetary system.

## Transit photometry

In the case that an exoplanetary system is oriented `edge on` from our vantage point on earth, then planets within the system will periodically occlude the central star. By observing the occlusion, it is possible to determine many of the physical and orbital parameters of an exoplanet.

{% capture occdepth %}{% increment equation_num %}{% endcapture %}
$$
    \Delta_L = \frac{\theta_{planet}}{\theta_{star}} = \frac{R_{planet}^2}{R_{star}^2} \approx \frac{r_{planet}^2}{r_{star}^2} \text{\color{aqua}[ {{ complexmod }} ]}
$$

The reduction in stellar light observed during each transit, ``Occlusion depth'', is proportional to the angular areas of both the planet and star. An expression for this is given in equation <fig>[ {{ occdepth }} ]</fig>, where $$\theta$$ is the angular area, and $$R$$ the angular radius of each object. In the small angle approximation, the ratio of $$R$$ becomes equal to the ratio of $$r$$, the true radii of each object.
