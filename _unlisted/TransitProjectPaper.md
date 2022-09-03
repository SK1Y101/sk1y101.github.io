---
layout: distill
title: Masters Thesis
longtitle: Determining The Parameters of Exoplanetary Candidates From Transit Timing Variations
description: Searching for Transit Timing Variations to determine the parameters of additional exoplanets in a system.
img: assets/img/TransitProject/TTVModelAnimation.gif
permalink: /projects/TransitProject/paper/
importance:
github:
  user: SK1Y101
  repo: TransitProject
  onpage: true
  showbadges: true
  contributors: true
category: work
date: 2022-05-24

authors:
  - name: Jack Lloyd-Walters FRAS
    url: "https://lloydwaltersj.com"
    affiliations:
      name: Royal Astronomical Society, Portsmouth University, Institute of Physics
  - name: Stephen Futcher FCA FRAS
    url: 
    affiliations:
      name: Royal Astronomical Society, Portsmouth University, Hampshire Astronomical Group
  - name: Dr. Hooshyar Assadullahi
    url: 
    affiliations:
      name: Portsmouth University
  - name: Prof. Daniel Thomas
    url: 
    affiliations:
      name: Portsmouth University

links:
  pdf: TransitProject/TransitDissertation.pdf
  url:

bibliography: transitproject.bib

# Optionally, you can add a table of contents to your post.
# NOTES:
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - we may want to automate TOC generation in the future using
#     jekyll-toc plugin (https://github.com/toshimaru/jekyll-toc).

toc:
  - name: Abstract
  - name: Introduction
    subsections:
      - name: Transit photometry
      - name: Transit timing
        subsubsections:
          - name: Barycentre motion
          - name: Orbital perturbation
          - name: mean motion libration
      - name: Project objectives
  - name: Methodology
    subsections:
      - name: TTV Models
        subsubsections:
          - name: Interior perturbation
          - name: Exterior perturbation
      - name: Parameter search
        subsubsections:
          - name: Optimisation
          - name: Model comparison
          - name: Markov Chain, Monte Carlo
  - name: Results / Discussion
    subsections:
      - name: Observations
      - name: Light curve analysis
        subsubsections:
          -name: De-trending
          -name: Transit fitting
          -name: TTV Residuals
      - name: Simulation pipeline
        subsubsections:
          - name: Initialisation
          - name: Simulated TTV
      - name: Analytical Models
        subsubsections:
          - name: System and TTV
          - name: Model comparison
          - name: Parameter optimisation
          - name: Model selection
          - name: Most likely system
      - name: Discussion
        subsubsections:
          - name: Evaluation
          - name: Limitations
          - name: Errors
  - name: Conclusion
  - name: Acknowledgements
  - name: Extra material
    subsections:
      - name: Transit duration derivation
  

# Below is an example of injecting additional post-specific styles.
# If you use this post as a template, delete this _styles block.

---
{% capture figurenums %}{% increment transit_figure_num %}{% increment transit_equation_num %}{% increment transit_table_num %}{% endcapture %}

## Abstract

Transit Timing Variation (TTV) provides a powerful tool to probe the dynamical configuration of exoplanetary systems from historical transit data <d-cite key="firstTTVPaper"></d-cite>, <d-cite key="secondTTVPaper"></d-cite>. TTV analysis has allowed both verification of planetary parameters <d-cite key="TrappistMass"></d-cite> and the discovery of new planetary bodies <d-cite key="Keplerc"></d-cite> from transit observation alone.
As part of this work, additional transit light curves have been collected with the 24" Ritchey-Chrétien telescope at Clanfield observatory and combined with the ExoClock database <d-cite key="ExoClockI"></d-cite>, <d-cite key="ExoClockII"></d-cite>, Exoplanet transit database <d-cite key="ETD"></d-cite>, and *TESS* light curves <d-cite key="tess"></d-cite> to create a set of historical TTV data for analysis.
A set of extensible TTV models have been developed to analytically approximate the chaotic n-body nature of real planetary systems. A computational pipeline to automate model fitting using various parameter optimisation <d-cite key="diffEvo"></d-cite>, <d-cite key="dualAnnealing"></d-cite> and model comparison <d-cite key="AIC"></d-cite>, <d-cite key="AIC2"></d-cite>, <d-cite key="AICC"></d-cite>, <d-cite key="BIC"></d-cite> techniques has been developed in-situ, allowing verification of model validity and analysis of TTV candidates using a combination of simulation and historical TTV data.
The models developed were found to accurately describe TTV, and could determine the initial system parameters of simulated TTV systems to reasonable accuracy.
Future work will allow extensions to these models, providing a more powerful suite of analytical tools for exoplanetary science, and the application of these methods to real exoplanetary systems with the possibility of new planetary discoveries.

<div class="l-gutter">
  {% include figure.html path="assets/img/TransitProject/uop-logo-stacked.png" %}
  {% include figure.html path="assets/img/TransitProject/HAGLogo.jpg" %}
</div>

***

## Introduction

In the last quarter-century, exoplanet detections have seen astronomical success, in no small part due to the launch of several space bourne telescopes. Of the 5000 planets found within 3800 planetary systems, around three quarters have been discovered through transit photometry <d-cite key="exoplanetArchive"></d-cite>. To this day, over 130 million light curves have been observed, providing a large base for historical analysis.

Of particular interest for this project is a specific subset of transit photometry that makes heavy use of this historical data. "Transit Timing Variation", or "TTV", reanalyses historical transit observations for deviation from 2-body Keplerian motion to provide an insight into the dynamics of an exoplanetary system.

### Transit photometry

In the case that an exoplanetary system is oriented "edge on" from our vantage point on earth, then planets within the system will periodically occlude the central star. By observing the occlusion, it is possible to determine many of the physical and orbital parameters of an exoplanet.

{% capture occdepth %}{% increment transit_equation_num %}{% endcapture %}
$$ \Delta_L = \frac{\theta_{planet}}{\theta_{star}} = \frac{R_{planet}^2}{R_{star}^2} \approx \frac{r_{planet}^2}{r_{star}^2} \text{[ {{ occdepth }} ]}$$

The reduction in stellar light observed during each transit, "Occlusion depth"", is proportional to the angular areas of both the planet and star. An expression for this is given in equation <fig>[ {{ occdepth }} ]</fig>, where $$ \theta $$ is the angular area, and $R$ the angular radius of each object. In the small angle approximation, the ratio of $R$ becomes equal to the ratio of $r$, the true radii of each object.

{% capture transitLoc %}{% increment transit_figure_num %}{% endcapture %}
<div class="row">
    <div class="col-sm g-0 imgfig">
        {% include figure.html path="assets/img/TransitProject/TransitLocation.png" %}
    </div>
</div>
<div class="caption">
    <fig>[ {{ transitLoc }} ]</fig> Exoplanet location to observed light curve]{How the location of an exoplanet corresponds to the observed light curve. Stellar limb darkening was ignored for simplicity.
</div>

{% capture transitduration %}{% increment transit_equation_num %}{% endcapture %}
Under the approximation that an exoplanetary transit is small compared to the size of its orbit, the velocity of the exoplanet, $$ v_{planet} $$, will remain constant. By approximating the transit as a line segment, the time duration of this transit will be proportional to the combined diameters of the body and star, as demonstrated by figure <fig>[ {{ transitLoc }} ]</fig>, and expressed in equation <fig>[ {{ transitduration }} ]</fig>.

$$ T_{transit} = \frac{2 \left(R_{star} + R_{planet}\right)}{v_{planet}} \text{[ {{ transitduration }} ]} $$

{% capture transitduration2 %}{% increment transit_equation_num %}{% endcapture %}
By instead considering the transit as a circular arc (and assuming the orbital eccentricity is low), the expression for transit duration is given in equation <fig>[ {{ transitduration2 }} ]</fig>, where $a$ is the semi-major axis of the orbit.

$$ T_{transit} = \frac{2a}{v_{planet}}\arcsin\frac{R_{star}+R_{planet}}{a}  \text{[ {{ transitduration2 }} ]} $$

{% capture impact %}{% increment transit_equation_num %}{% endcapture %}
Introducing the effect of orbital inclination further complicates this approximation, as the exoplanet will not transit across the equator of the stellar disc, as demonstrated in figure <fig>[ {{ inclinedtransit }}]</fig>. This introduces the quantity known as the "Impact parameter", and is given in equation <fig>[ {{ impact }}]</fig>, where $i$ is the orbital inclination and $$ \Omega $$ the longitude of the ascending node.

$$ b = a \cos{i}\sin{\Omega}  \text{[ {{ impact }} ]} $$

{% capture transitduration3 %}{% increment transit_equation_num %}{% endcapture %}
$$ T_{transit} = \frac{2a}{v_{planet}}\arcsin\frac{\sqrt{ \left(R_{star}+R_{planet}\right)^2 - b^2 }}{a}  \text{[ {{ transitduration3 }} ]} $$

Introducing the impact parameter, $$ b $$, to equation <fig>[ {{ transitduration2 }} ]</fig> gives the expression given in equation <fig>[ {{ transitduration3 }} ]</fig>. This allows information about both the inclination and radius of the orbit to be deduced from a single transit. A full derivation of equations <fig>[ {{ transitduration }} ]</fig>, <fig>[ {{ transitduration2 }} ]</fig>, and <fig>[ {{ transitduration3 }} ]</fig> is given in section \ref{transitderiv}.

{% capture inclinedtransit %}{% increment transit_figure_num %}{% endcapture %}
<div class="row">
    <div class="col-sm g-0 imgfig">
        {% include figure.html path="assets/img/TransitProject/inclinedOrbit" %}
    </div>
</div>
<div class="caption">
    <fig>[ {{ inclinedtransit }} ]</fig> How the orbital inclination affects the length of a transit. The axis scale is in stellar radii, and it can be seen in this configuration that a transit would only be visible if the relative inclination were in the region of $\pm 1$ degree.
</div>

### Transit timing

TTV, by definition, is any departure from the predicted transit timing for an exoplanet as given by its linear ephemerides. While this can be due to a multitude of reasons, of primary interest for this paper are those transit timing variations caused by additional planets in the system <d-cite key="firstTTVPaper"></d-cite><d-cite key="secondTTVPaper"></d-cite>.

In the case where a system contains only a central star and orbiting planet, the equations of motion for the system are given by the closed-form Keplerian equations. Introducing an additional body to the system, however, causes the equations of motion to become chaotic, with no closed-form solution possible. This departure from Keplerian motion due to an additional gravitating body results in any transiting planets exhibiting TTV, whose parameters are related in some way to the orbital and physical properties of the perturbing body.

In the case where gravitational interactions between orbiting bodies are small compared to the gravity of the central star, the motion of each body can be described as some small perturbation atop the closed-form Keplerian equations. Measuring TTV allows the dynamical configuration of the system to be probed, as these are entirely caused by gravitational perturbation. This was demonstrated for the TRAPPIST-1 system, where the masses and orbital configurations of the planets were deduced from transit timing variations <d-cite key="TrappistMass"></d-cite>, and for the Kepler-19 system, where an additional planet was discovered through TTV analysis <d-cite key="Keplerc"></d-cite>, to name but two examples.

Of particular interest for this project are the three following causes for transit timing variations: Barycentre motion; Orbital perturbation; and mean motion libration. While other causes are evident, these are a useful starting ground for intuition.

#### Barycentre motion

{% capture interiorTTV %}{% increment transit_figure_num %}{% endcapture %}
<div class="row">
    <div class="col-sm g-0 imgfig">
        {% include figure.html path="assets/img/TransitProject/TTVDueToInnerBarycentre" %}
    </div>
</div>
<div class="caption">
    <fig>[ {{ interiorTTV }} ]</fig> Transit timing variations due to interior planetary motion shifting the barycentre. From left to right are the early-time, expected time, and late-time transits. Note how, as the graphics are co-rotating with the transiting planet-barycentre reference frame, it is the apparent motion of the star that causes TTV.
</div>

As all bodies in an exoplanetary system orbit about the common barycentre, rather than the centre of the parent star, the position of the star will appear to shift over time. This motion underpins both Doppler spectroscopic and astrometric methods for exoplanetary detection, and also results in variations in transit times.

As a transit occurs when the star and planet are aligned, the motion of the star relative to the barycentre will affect the timing of a transit. As the star moves, the planet must also move along its orbit for a transit to occur. The difference in position of the exoplanet as compared to if the star had not moved causes transits to occur earlier or later than predicted. This variation is a function of the position of the barycentre, as shown in figure <fig>[ {{ interiorTTV }} ]</fig>, and is especially sensitive to massive planets that orbit interior to the transiting planet. 

#### Orbital perturbation

{% capture exteriorTTV %}{% increment transit_figure_num %}{% endcapture %}
<div class="row">
    <div class="col-sm g-0 imgfig">
        {% include figure.html path="assets/img/TransitProject/TTVDueToPerturbation" %}
    </div>
</div>
<div class="caption">
    <fig>[ {{ exteriorTTV }} ]</fig> Transit timing variations due to exterior planet(s) perturbing the orbit of the transiting planet. The solid line is the unperturbed orbit, the dashed is the instantaneous perturbed orbit, and the arrow marks the instantaneous perturbing force vector. From left to right are the early-time, expected time, and late-time transits.
</div>

As discussed, the equations of motion have no closed-form solution for systems with three or more bodies, but can be expressible as a set of perturbed 2-body solutions, as seen in figure <fig>[ {{ exteriorTTV }} ]</fig>.

As perturbing planets orbit about the system, their gravitational interactions pull the transiting planet further ahead or behind its unperturbed position. This primarily affects the semi-major axis of the transiting planet, and thus it's period, causing the transit to appear earlier or later as the planet is in a lower or higher orbit than predicted from simple Keplerian motion. This motion is especially sensitive to massive perturbing planets exterior to the transiting planet on elliptical orbits.

#### mean motion libration

In the case where perturbing planets are in or near mean motion resonance with the transiting planet, the effects of orbital perturbation will be greatly exaggerated. As the planets are in mean motion resonance, where their orbital periods are expressed as some small integer ratio, they will only experience conjunctions at discrete locations along their orbits. This causes orbital perturbations to accumulate, rather than average out over many orbits.

As the planets orbit about the system, perturbation causes their respective periods to drift, as seen in figure <fig>[ {{ exteriorTTV }} ]</fig>. This in turn causes the conjunction positions to drift along the orbit, causing the perturbations to act opposite once the conjunction locations have rotated $$ 180^{\circ} $$ relative to the initial position. This causes cyclic changes in orbital elements with larger magnitudes over longer timescales than any of the previously mentioned causes. These changes are especially sensitive to perturbing planets of much lower mass than seen in other TTV causes, particularly planets in first order resonance with the transiting planet, such as is seen in the kepler-19 system <d-cite key="Keplerc"></d-cite>.

### Project objectives

As the detection and analysis of transit timing variations rely on historical data, additional observations have been made throughout this project with the 24" Ritchey-Chrétien telescope at Clanfield observatory. These observations were analysed with Holomon Photometric Software
 (HOPS) <d-cite key="HOPS"></d-cite>, and uploaded to the ExoClock database, where other transit observations are combined and verified <d-cite key="ExoClockI"></d-cite><d-cite key="ExoClockII"></d-cite>.

Transit data from both ExoClock and the exoplanet transit database (ETD) <d-cite key="ETD"></d-cite> have been combined with light curves from the *TESS* spacecraft <d-cite key="tess"></d-cite>. These light curves have been analysed with the Juliet python package to obtain mid-transit times <d-cite key="juliet"></d-cite>. A set of linear ephemerides were fit with linear regression to the observed transit data and compared with those published in both the ExoClock database and the NASA Exoplanet Archive <d-cite key="exoplanetArchive"></d-cite>. Computing predicted transit times from these linear ephemerides have allowed a set of TTV to be computed for each planetary target.

A set of analytical TTV Models have been developed to fit to this TTV data, providing a method for determining the configuration of each exoplanetary system from transit observation. These models have had parameters determined through various minimisation techniques using the SciPy package <d-cite key="scipy"></d-cite>, such as least squares regression <d-cite key="leastSquare"></d-cite>, bounded limited memory Broyden–Fletcher–Goldfarb–Shanno <d-cite key="ByrdALM"></d-cite><d-cite key="ZhuAlgorithmL"</d-cite>, differential evolution <d-cite key="diffEvo"></d-cite>, and dual annealing <d-cite key="dualAnnealing"</d-cite>. The parameter distribution was determined with Markov Chain Monte Carlo (MCMC) analysis using the emcee package <d-cite key="emcee"</d-cite>. This was used to provide uncertainty bounds on reported values by taking the $$ 16^\text{th} $$, $$ 50^\text{th} $$, and $$ 84^\text{th} $$ quantiles of the MCMC samples.

