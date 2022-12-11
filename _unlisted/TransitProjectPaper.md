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
      name: Royal Astronomical Society, Portsmouth University, Institute of Physics, British Astronomical Association
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
$$
  \newcommand{\errorvalue}[3]{
    #1 { \substack{+#2 \\ -#3} }
  }
$$
## Abstract

Transit Timing Variation (TTV) provides a powerful tool to probe the dynamical configuration of exoplanetary systems from historical transit data <d-cite key="firstTTVPaper"></d-cite><d-cite key="secondTTVPaper"></d-cite>. TTV analysis has allowed both verification of planetary parameters <d-cite key="TrappistMass"></d-cite> and the discovery of new planetary bodies <d-cite key="Keplerc"></d-cite> from transit observation alone.
As part of this work, additional transit light curves have been collected with the 24" Ritchey-Chrétien telescope at Clanfield observatory and combined with the ExoClock database <d-cite key="ExoClockI"></d-cite><d-cite key="ExoClockII"></d-cite>, Exoplanet transit database <d-cite key="ETD"></d-cite>, and *TESS* light curves <d-cite key="tess"></d-cite> to create a set of historical TTV data for analysis.
A set of extensible TTV models have been developed to analytically approximate the chaotic n-body nature of real planetary systems. A computational pipeline to automate model fitting using various parameter optimisation <d-cite key="diffEvo"></d-cite><d-cite key="dualAnnealing"></d-cite> and model comparison <d-cite key="AIC"></d-cite><d-cite key="AIC2"></d-cite><d-cite key="AICC"></d-cite><d-cite key="BIC"></d-cite> techniques has been developed in-situ, allowing verification of model validity and analysis of TTV candidates using a combination of simulation and historical TTV data.
The models developed were found to accurately describe TTV, and could determine the initial system parameters of simulated TTV systems to reasonable accuracy.
Future work will allow extensions to these models, providing a more powerful suite of analytical tools for exoplanetary science, and the application of these methods to real exoplanetary systems with the possibility of new planetary discoveries.

<div class="l-gutter">
  {% include figure.html path="assets/img/TransitProject/uop-logo-stacked.png" %}
  {% include figure.html path="assets/img/TransitProject/HAGLogo.jpg" %}
</div>

## Introduction

In the last quarter-century, exoplanet detections have seen astronomical success, in no small part due to the launch of several space bourne telescopes. Of the 5000 planets found within 3800 planetary systems, around three quarters have been discovered through transit photometry <d-cite key="exoplanetArchive"></d-cite>. To this day, over 130 million light curves have been observed, providing a large base for historical analysis.

Of particular interest for this project is a specific subset of transit photometry that makes heavy use of this historical data. "Transit Timing Variation", or "TTV", reanalyses historical transit observations for deviation from 2-body Keplerian motion to provide an insight into the dynamics of an exoplanetary system.

### Transit photometry

In the case that an exoplanetary system is oriented "edge on" from our vantage point on earth, then planets within the system will periodically occlude the central star. By observing the occlusion, it is possible to determine many of the physical and orbital parameters of an exoplanet.

{% capture occdepth %}{% increment transit_equation_num %}{% endcapture %}
$$ \Delta_L = \frac{\theta_{planet}}{\theta_{star}} = \frac{R_{planet}^2}{R_{star}^2} \approx \frac{r_{planet}^2}{r_{star}^2} $$
<div class="l-gutter"><fig>({{ occdepth }})</fig></div>

The reduction in stellar light observed during each transit, "Occlusion depth"", is proportional to the angular areas of both the planet and star. An expression for this is given in equation <fig>[{{ occdepth }}]</fig>, where $$ \theta $$ is the angular area, and $$ R $$ the angular radius of each object. In the small angle approximation, the ratio of $$ R $$ becomes equal to the ratio of $$ r $$, the true radii of each object.

{% capture transitLoc %}{% increment transit_figure_num %}{% endcapture %}
<div class="row">
    <div class="col-sm g-0 imgfig">
        {% include figure.html path="assets/img/TransitProject/TransitLocation.png" %}
    </div>
</div>
<div class="caption">
    Figure {{ transitLoc }}. How the location of an exoplanet corresponds to the observed light curve. Stellar limb darkening was ignored for simplicity.
</div>

{% capture transitduration %}{% increment transit_equation_num %}{% endcapture %}
Under the approximation that an exoplanetary transit is small compared to the size of its orbit, the velocity of the exoplanet, $$ v_{planet} $$, will remain constant. By approximating the transit as a line segment, the time duration of this transit will be proportional to the combined diameters of the body and star, as demonstrated by figure <fig>[{{ transitLoc }}]</fig>, and expressed in equation <fig>[{{ transitduration }}]</fig>.

$$ T_{transit} = \frac{2 \left(R_{star} + R_{planet}\right)}{v_{planet}} $$
<div class="l-gutter"><fig>({{ transitduration }})</fig></div>

{% capture transitduration2 %}{% increment transit_equation_num %}{% endcapture %}
By instead considering the transit as a circular arc (and assuming the orbital eccentricity is low), the expression for transit duration is given in equation <fig>[{{ transitduration2 }}]</fig>, where $$ a $$ is the semi-major axis of the orbit.

$$ T_{transit} = \frac{2a}{v_{planet}}\arcsin\frac{R_{star}+R_{planet}}{a} $$
<div class="l-gutter"><fig>({{ transitduration2 }})</fig></div>

{% capture eq_impact %}{% increment transit_equation_num %}{% endcapture %}
{% capture inclinedtransit %}{% increment transit_figure_num %}{% endcapture %}
Introducing the effect of orbital inclination further complicates this approximation, as the exoplanet will not transit across the equator of the stellar disc, as demonstrated in figure <fig>[{{ inclinedtransit }}]</fig>. This introduces the quantity known as the "Impact parameter", and is given in equation <fig>[{{ eq_impact }}]</fig>, where $$ i $$ is the orbital inclination and $$ \Omega $$ the longitude of the ascending node.

$$ b = a \cos{i}\sin{\Omega} $$
<div class="l-gutter"><fig>({{ eq_impact }})</fig></div>

{% capture transitduration3 %}{% increment transit_equation_num %}{% endcapture %}
$$ T_{transit} = \frac{2a}{v_{planet}}\arcsin\frac{\sqrt{ \left(R_{star}+R_{planet}\right)^2 - b^2 }}{a} $$
<div class="l-gutter"><fig>({{ transitduration3 }})</fig></div>

Introducing the impact parameter, $$ b $$, to equation <fig>[{{ transitduration2 }}]</fig> gives the expression given in equation <fig>[{{ transitduration3 }}]</fig>. This allows information about both the inclination and radius of the orbit to be deduced from a single transit. A full derivation of equations <fig>[{{ transitduration }}]</fig>, <fig>[{{ transitduration2 }}]</fig>, and <fig>[{{ transitduration3 }}]</fig> is given in [this section](#transit-duration-derivation).

<div class="row">
    <div class="col-sm g-0 imgfig">
        {% include figure.html path="assets/img/TransitProject/inclinedOrbit.png" %}
    </div>
</div>
<div class="caption">
    Figure {{ inclinedtransit }}. How the orbital inclination affects the length of a transit. The axis scale is in stellar radii, and it can be seen in this configuration that a transit would only be visible if the relative inclination were in the region of $$\pm{1}$$ degree.
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
        {% include figure.html path="assets/img/TransitProject/TTVDueToInnerBarycentre.pdf" %}
    </div>
</div>
<div class="caption">
    Figure {{ interiorTTV }}. Transit timing variations due to interior planetary motion shifting the barycentre. From left to right are the early-time, expected time, and late-time transits. Note how, as the graphics are co-rotating with the transiting planet-barycentre reference frame, it is the apparent motion of the star that causes TTV.
</div>

As all bodies in an exoplanetary system orbit about the common barycentre, rather than the centre of the parent star, the position of the star will appear to shift over time. This motion underpins both Doppler spectroscopic and astrometric methods for exoplanetary detection, and also results in variations in transit times.

As a transit occurs when the star and planet are aligned, the motion of the star relative to the barycentre will affect the timing of a transit. As the star moves, the planet must also move along its orbit for a transit to occur. The difference in position of the exoplanet as compared to if the star had not moved causes transits to occur earlier or later than predicted. This variation is a function of the position of the barycentre, as shown in figure <fig>[{{ interiorTTV }}]</fig>, and is especially sensitive to massive planets that orbit interior to the transiting planet. 

#### Orbital perturbation

{% capture exteriorTTV %}{% increment transit_figure_num %}{% endcapture %}
<div class="row">
    <div class="col-sm g-0 imgfig">
        {% include figure.html path="assets/img/TransitProject/TTVDueToPerturbation.pdf" %}
    </div>
</div>
<div class="caption">
    Figure {{ exteriorTTV }}. Transit timing variations due to exterior planet(s) perturbing the orbit of the transiting planet. The solid line is the unperturbed orbit, the dashed is the instantaneous perturbed orbit, and the arrow marks the instantaneous perturbing force vector. From left to right are the early-time, expected time, and late-time transits.
</div>

As discussed, the equations of motion have no closed-form solution for systems with three or more bodies, but can be expressible as a set of perturbed 2-body solutions, as seen in figure <fig>[{{ exteriorTTV }}]</fig>.

As perturbing planets orbit about the system, their gravitational interactions pull the transiting planet further ahead or behind its unperturbed position. This primarily affects the semi-major axis of the transiting planet, and thus it's period, causing the transit to appear earlier or later as the planet is in a lower or higher orbit than predicted from simple Keplerian motion. This motion is especially sensitive to massive perturbing planets exterior to the transiting planet on elliptical orbits.

#### mean motion libration

In the case where perturbing planets are in or near mean motion resonance with the transiting planet, the effects of orbital perturbation will be greatly exaggerated. As the planets are in mean motion resonance, where their orbital periods are expressed as some small integer ratio, they will only experience conjunctions at discrete locations along their orbits. This causes orbital perturbations to accumulate, rather than average out over many orbits.

As the planets orbit about the system, perturbation causes their respective periods to drift, as seen in figure <fig>[{{ exteriorTTV }}]</fig>. This in turn causes the conjunction positions to drift along the orbit, causing the perturbations to act opposite once the conjunction locations have rotated $$ 180^{\circ} $$ relative to the initial position. This causes cyclic changes in orbital elements with larger magnitudes over longer timescales than any of the previously mentioned causes. These changes are especially sensitive to perturbing planets of much lower mass than seen in other TTV causes, particularly planets in first order resonance with the transiting planet, such as is seen in the kepler-19 system <d-cite key="Keplerc"></d-cite>.

### Project objectives

As the detection and analysis of transit timing variations rely on historical data, additional observations have been made throughout this project with the 24" Ritchey-Chrétien telescope at Clanfield observatory. These observations were analysed with Holomon Photometric Software
 (HOPS) <d-cite key="HOPS"></d-cite>, and uploaded to the [ExoClock](https://www.exoclock.space/database/observations_by_observer#419) database, where other transit observations are combined and verified <d-cite key="ExoClockI"></d-cite><d-cite key="ExoClockII"></d-cite>.

Transit data from both ExoClock and the exoplanet transit database (ETD) <d-cite key="ETD"></d-cite> have been combined with light curves from the *TESS* spacecraft <d-cite key="tess"></d-cite>. These light curves have been analysed with the Juliet python package to obtain mid-transit times <d-cite key="juliet"></d-cite>. A set of linear ephemerides were fit with linear regression to the observed transit data and compared with those published in both the ExoClock database and the NASA Exoplanet Archive <d-cite key="exoplanetArchive"></d-cite>. Computing predicted transit times from these linear ephemerides have allowed a set of TTV to be computed for each planetary target.

A set of analytical TTV Models have been developed to fit to this TTV data, providing a method for determining the configuration of each exoplanetary system from transit observation. These models have had parameters determined through various minimisation techniques using the SciPy package <d-cite key="scipy"></d-cite>, such as least squares regression <d-cite key="leastSquare"></d-cite>, bounded limited memory Broyden–Fletcher–Goldfarb–Shanno <d-cite key="ByrdALM"></d-cite><d-cite key="ZhuAlgorithmL"></d-cite>, differential evolution <d-cite key="diffEvo"></d-cite>, and dual annealing <d-cite key="dualAnnealing"></d-cite>. The parameter distribution was determined with Markov Chain Monte Carlo (MCMC) analysis using the emcee package <d-cite key="emcee"></d-cite>. This was used to provide uncertainty bounds on reported values by taking the $$ 16^\text{th} $$, $$ 50^\text{th} $$, and $$ 84^\text{th} $$ quantiles of the MCMC samples.

## Methodology

### TTV Models

As a first step in transit timing variation analysis, a model, or set of models, is required against which data can be fitted. As these models will be used for any given simulation or real-world system setup, they must have the following properties:

* Computationally inexpensive, models will need to be executed thousands of times for parameter fitting and should be vectorisable to take advantage of optimisation.
* Extensible, TTV models should be formulated with standard equations of motion, such that they can be further re-written to take advantage of more complex processes.
* System independent, many TTV models in the literature <d-cite key="secondTTVPaper"></d-cite><d-cite key="agol2016"></d-cite><d-cite key="agol2018"></d-cite> are presented in only the three body case. These models should be provided in a form that allows arbitrarily many planets to be accounted for.

{% capture TTVClasses %}{% increment transit_figure_num %}{% endcapture %}
Strictly speaking, there are three categories into which TTV models can be subdivided. Those are a transiting planet exterior to perturbing planets, a transiting planet interior to perturbing planets, and a transiting planet both interior and exterior to perturbing planets. These three model classes, demonstrated visually in figure <fig>[{{ TTVClasses }}]</fig>, represent an increasing level of complexity for derivation. Of those, only the interior and exterior perturbations require derivation, as the boundary model is formed from a combination of the two.

<div class="row">
    <div class="col-sm g-0 imgfig">
        {% include figure.html path="assets/img/TransitProject/TTVModelSpace" %}
    </div>
</div>
<div class="caption">
    Figure {{ TTVClasses }}. Three classes of TTV cause, from left to right, are interior perturbation, exterior perturbation, and combined (or boundary) perturbation. The classes each represent a subtly different way of describing TTV, and the form of each model reflects the different approximations and approaches made.
</div>

#### Interior perturbation

In the case where a transiting exoplanet orbits exterior to the perturbing planets, the transit timing variations seen will be dominated by the motion of the barycentre, as mentioned in [this section](#barycentre-motion). This setup is the most intuitive to understand, and makes a useful starting point.

##### Initial derivation

{% capture eq_barycentre %}{% increment transit_equation_num %}{% endcapture %}
The distance between the barycentre and primary body is given in equation <fig>[{{ eq_barycentre }}]</fig>, where $$ r $$ is the distance between the primary and secondary, $$ m_0 $$ and $$ m_1 $$ are the masses of the primary and secondary respectively, and $$ \mu $$ is the reduced mass of the secondary.

$$ r_b = r \frac{m_1}{m_1 + m_0} = r \mu_1 $$
<div class="l-gutter"><fig>({{ eq_barycentre }})</fig></div>

{% capture eq_multibarycentre %}{% increment transit_equation_num %}{% endcapture %}
If we take the assumption that gravitational influences are dominated by that of the central star, any effects between planets will be negligible. Thus, the position of the global barycentre can be described as a linear combination of each planet in the system, as given in equation <fig>[{{ eq_multibarycentre }}]</fig>.

$$ r_b = \sum_i^n  r_i \mu_i $$
<div class="l-gutter"><fig>({{ eq_multibarycentre }})</fig></div>

{% capture eq_orbitpos %}{% increment transit_equation_num %}{% endcapture %}
The position of an exoplanet along its orbit is given in equation <fig>[{{ eq_orbitpos }}]</fig>, where $$ P_i $$ is the orbital period of the planet, $$ t_{0, i} $$ is the initial transit time of the planet, and $$ \phi $$ is the angle between the planet, and the closest point of its orbit as seen from earth.

$$ \phi = \frac{2 \pi \left(t - t_{0,i} \right)}{P_i} $$
<div class="l-gutter"><fig>({{ eq_orbitpos }})</fig></div>

{% capture eq_projbarycentre %}{% increment transit_equation_num %}{% endcapture %}
This expression of the angle of exoplanet position is equivalent to the mean anomaly of the planet, and can be combined with equation <fig>[{{ eq_multibarycentre }}]</fig> to obtain an expression for the position of the barycentre of the system at any given time, $$ t $$, as given in equation <fig>[{{ eq_projbarycentre }}]</fig>. The introduction of the sine term is due to the nature of TTV. Only the motion of the barycentre perpendicular to the vantage point of the earth is relevant.

$$ r_b = \sum_i^n \left[ r_i \mu_i \sin \frac{2 \pi \left(t - t_{0,i} \right)}{P_i}\right] $$
<div class="l-gutter"><fig>({{ eq_projbarycentre }})</fig></div>

As this is the distance of the barycentre from the star, we can negate the expression to obtain the distance of the star from the barycentre. This also defines the additional distance the transiting planet must cover for the transit to occur.

{% capture eq_ttvdist %}{% increment transit_equation_num %}{% endcapture %}
$$ \delta_x = -\sum_i^n \left[ r_i \mu_i \sin \frac{2 \pi \left(t - t_{0,i} \right)}{P_i}\right] $$
<div class="l-gutter"><fig>({{ eq_ttvdist }})</fig></div>

{% capture eq_suvat %}{% increment transit_equation_num %}{% endcapture %}
If we assume the distance associated with a transit is small compared to the size of the orbit of the transiting planet, the velocity of all bodies in the system will remain constant during the transit. Thus, to convert the distance, $$ \delta_x $$, to a transit timing variation, we can apply standard equations of motion, as given in equation <fig>[{{ eq_suvat }}]</fig>. As the stellar mass will be many orders of magnitude larger than the planet, it's velocity contribution to the TTV will be negligible.

$$ t = \frac{\delta_x}{v_{planet} - v_{star}} \approx \frac{\delta_x}{v_{planet}} $$
<div class="l-gutter"><fig>({{ eq_suvat }})</fig></div>

{% capture eq_circorbitvel %}{% increment transit_equation_num %}{% endcapture %}
$$ v_{planet} = \sqrt{\frac{G\left(m_{star} + m_{planet}\right)}{a_{planet}}} = \frac{2 \pi a_{planet}}{P_{planet}} $$
<div class="l-gutter"><fig>({{ eq_circorbitvel }})</fig></div>

{% capture eq_ttvbarycentre %}{% increment transit_equation_num %}{% endcapture %}
If we assume the orbit of the transiting planet to be circular, the orbital velocity is that given in equation <fig>[{{ eq_circorbitvel }}]</fig>. This can be combined with equation <fig>[{{ eq_suvat }}]</fig> and equation <fig>[{{ eq_ttvdist }}]</fig> to provide an expression for the transit timing variation in this case, as given in equation <fig>[{{ eq_ttvbarycentre }}]</fig>.

$$ \delta_T = -\frac{P_T}{2 \pi a_T}\sum_i^n \left[ a_i \mu_i \sin \frac{2 \pi \left(t - t_{0,i} \right)}{P_i}\right] $$
<div class="l-gutter"><fig>({{ eq_ttvbarycentre }})</fig></div>

##### Extension to eccentric orbits

While many of the approximations and assumptions made in the derivation of equation <fig>[{{ eq_ttvbarycentre }}]</fig> are valid for real planetary systems, the exclusion of orbital eccentricity will cause measurable deviation.

{% capture eq_orbitalradius %}{% increment transit_equation_num %}{% endcapture %}
{% capture eq_visviva %}{% increment transit_equation_num %}{% endcapture %}
As the orbits are no longer circular, we cannot use $$ a $$ and $$ r $$ interchangeably, instead, we must use the planets' true anomaly, $$ f $$, and eccentricity, $$ e $$, as given in equation <fig>[{{ eq_orbitalradius }}]</fig>. Additionally, as orbital velocity varies over an elliptical orbit, we need to use the vis-viva equation as given in equation <fig>[{{ eq_visviva }}]</fig>.

$$ r = \frac{a \left(1 - e^2\right)}{1 + e \cos f} $$
<div class="l-gutter"><fig>({{ eq_orbitalradius }})</fig></div>

$$ v = \sqrt{G\left(m_{star} + m_{planet}\right) \left(\frac{2}{r} - \frac{1}{a}\right)} $$
<div class="l-gutter"><fig>({{ eq_visviva }})</fig></div>

{% capture eq_partialeccentricity %}{% increment transit_equation_num %}{% endcapture %}
Introducing equation <fig>[{{ eq_orbitalradius }}]</fig> to equation <fig>[{{ eq_ttvbarycentre }}]</fig> gives the following expression for TTV, given in equation <fig>[{{ eq_partialeccentricity }}]</fig>. As the orbital distance equation requires introduction of the true anomaly, the term, $$ \sin\frac{2\pi\left(t-t_{0,i}\right)}{P_i} $$, has also been replaced with the equivalent but more accurate expression using true anomaly and argument of periapsis, $$ \sin\left(f_i + \omega_i\right) $$.

$$ \delta_T = -\frac{P_T}{2 \pi a_T}\sum_i^n \left[ a_i \mu_i \frac{1 - e_i^2}{1 + e_i \cos f_i} \sin \left(f_i + \omega_i\right) \right] $$
<div class="l-gutter"><fig>({{ eq_partialeccentricity }})</fig></div>

{% capture eq_velocitynoG %}{% increment transit_equation_num %}{% endcapture %}
Combining the vis-viva equation with the equation for orbital period, $$ P = 2\pi\sqrt{a^3 / G\left(m_{star} + m_{planet}\right)} $$, gives equation <fig>[{{ eq_velocitynoG }}]</fig>, where the gravitational constant, $$ G $$, is abstracted away.

$$ v = \frac{2\pi a}{P}\sqrt{\left(\frac{2a - r}{r}\right)} $$
<div class="l-gutter"><fig>({{ eq_velocitynoG }})</fig></div>

{% capture eq_velocitynoR %}{% increment transit_equation_num %}{% endcapture %}
Introducing equation <fig>[{{ eq_orbitalradius }}]</fig> to equation <fig>[{{ eq_velocitynoG }}]</fig> gives equation <fig>[{{ eq_velocitynoR }}]</fig>, an expression for orbital velocity that does not require knowledge of distance from the star.

$$ v = \frac{2\pi a}{P}\sqrt{\frac{1 + 2 e \cos f + e^2}{1 - e^2}} $$
<div class="l-gutter"><fig>({{ eq_velocitynoR }})</fig></div>

{% capture eq_TTVeccentric %}{% increment transit_equation_num %}{% endcapture %}
This can be further combined with equation <fig>[{{ eq_partialeccentricity }}]</fig>, replacing our circular orbital velocity with the new eccentric orbital velocity, to give equation <fig>[{{ eq_TTVeccentric }}]</fig>, which is our model for TTV extended to include orbital eccentricity.

$$ \delta_T = -\frac{P_T}{2 \pi a_T}\left(\frac{1 - e_T^2}{1 + 2 e_T \cos f_T + e_T^2}\right)^\frac{1}{2} \cdot\sum_i^n \left[ a_i \mu_i \frac{1 - e_i^2}{1 + e_i \cos f_i} \sin \left(f_i + \omega_i\right) \right] $$
<div class="l-gutter"><fig>({{ eq_TTVeccentric }})</fig></div>

#### Exterior perturbation

{% capture eq_gravity %}{% increment transit_equation_num %}{% endcapture %}
To derive the effects of orbital perturbation, we follow a derivation for a two-planet case <d-cite key="agol2018"></d-cite>, and extend this to $$ n $$ planets. We assume the transiting planet to have zero eccentricity and all planets are on coplanar orbits. We give the equation of motion for a body acting under gravity in equation <fig>[{{ eq_gravity }}]</fig>.

$$ \ddot{\pmb{R}} = \sum_{j \ne i} \left[G m_j \frac{\pmb{R}_j - \pmb{R}_i}{ {\| \pmb{R}_j - \pmb{R}_i\|}^3}\right] $$
<div class="l-gutter"><fig>({{ eq_gravity }})</fig></div>

{% capture eq_barycentrefixed %}{% increment transit_equation_num %}{% endcapture %}
Where the bold indicates that the position of the planet, $$ \pmb{R} $$, is a vector. This can trivially be shown to satisfy <fig>[{{ eq_barycentrefixed }}]</fig>

$$ \sum_{i} m_i \pmb{\ddot{R}}_i = 0 $$
<div class="l-gutter"><fig>({{ eq_barycentrefixed }})</fig></div>

Which is a demonstration that the centre of mass of the system, $$ \pmb{R}_{C.o.M} $$ is fixed, and no external forces are at play. This set of equations are most commonly used in numerical approaches; for an analytical approach to perturbation, it is more convenient to deal with the Jacobi coordinates of the system <d-cite key="3bodypulsar"></d-cite><d-cite key="murraybook"></d-cite>.

{% capture eq_jacobi %}{% increment transit_equation_num %}{% endcapture %}
This gives a set of new coordinates, $$ r_i $$, describing the position of the $$ i^{th} $$ body relative to the mass interior to its orbit, as given in equation <fig>[{{ eq_jacobi }}]</fig>.

$$\begin{aligned}
\pmb{r}_0 &= \pmb{R}_{C.o.M} = 0 \\
\pmb{r}_1 &= \pmb{R}_1 - \frac{m_0\pmb{R}_0}{m_0} = \pmb{R}_1 - \pmb{R}_0 \\
\pmb{r}_2 &= \pmb{R}_2 - \frac{m_0\pmb{R}_0+m_1\pmb{R}_1}{m_0+m_1} \\
&... \\
\pmb{r}_{n+1} &= \pmb{R}_{n+1} - \frac{\sum^n_{j=0}m_j\pmb{R}_j}{\sum^n_{j=0}m_j}
\end{aligned}$$
<div class="l-gutter"><fig>({{ eq_jacobi }})</fig></div>

{% capture eq_jacobimotion %}{% increment transit_equation_num %}{% endcapture %}
We can reformulate the equations of motion in Jacobi coordinates, given in equation <fig>[{{ eq_jacobimotion }}]</fig>.

$$ \ddot{\pmb{r}}_{n+1} = \ddot{\pmb{R}}_{n+1} - \frac{\sum^n_{j=0}m_j\ddot{\pmb{R}}_j}{\sum^n_{j=0}m_j} $$
<div class="l-gutter"><fig>({{ eq_jacobimotion }})</fig></div>

{% capture eq_perturb %}{% increment transit_equation_num %}{% endcapture %}
As we are investigating the case of an exterior perturbation, we only consider the equation for the innermost body, $$ \ddot{\pmb{r}}_1 $$, given in equation <fig>[{{ eq_perturb }}]</fig>.

$$\begin{aligned}
\ddot{\pmb{r}}_1 &= \ddot{\pmb{R}}_1 - \ddot{\pmb{R}}_0 \\
\ddot{\pmb{r}}_1 &= \sum_{j \ne 1} \left[G m_j \frac{\pmb{R}_j - \pmb{R}_1}{ {\| \pmb{R}_j - \pmb{R}_1\|}^3}\right] - \sum_{j \ne 0} \left[G m_j \frac{\pmb{R}_j - \pmb{R}_0}{ {\| \pmb{R}_j - \pmb{R}_0\|}^3}\right]
\end{aligned}$$
<div class="l-gutter"><fig>({{ eq_perturb }})</fig></div>

{% capture eq_perturbCollected %}{% increment transit_equation_num %}{% endcapture %}
The double summation terms can be collected, to give equation <fig>[{{ eq_perturbCollected }}]</fig>,

$$ \ddot{\pmb{r}}_1 = Gm_0 \frac{\pmb{R}_0 - \pmb{R}_1}{\|\pmb{R}_0 - \pmb{R}_1|^3} - Gm_1 \frac{\pmb{R}_1 - \pmb{R}_0}{\|\pmb{R}_1 - \pmb{R}_0|^3} + \sum_{j=2} \left[ Gm_j \frac{\pmb{R}_j - \pmb{R}_1}{ {\| \pmb{R}_j - \pmb{R}_1\|}^3} - G m_j \frac{\pmb{R}_j - \pmb{R}_0}{ {\| \pmb{R}_j - \pmb{R}_0\|}^3} \right] $$
<div class="l-gutter"><fig>({{ eq_perturbCollected }})</fig></div>

For the Jacobian coordinates, We introduce the notation $$ \|\pmb{r}_i\| \equiv r_i $$. That is to say, coordinates in bold is the vector position, while non-bold is the magnitude of that vector. We also introduce the reduced mass, $$ \mu $$, given as $$ \mu_i = \frac{m_i}{M} $$, where $$ M $$ is the total mass of the system. As the central star typically dominates the mass of the system, this can also be written $$ \mu_i \approx \frac{m_i}{m_0} $$.

{% capture eq_njsakd %}{% increment transit_equation_num %}{% endcapture %}
$$ \ddot{\pmb{r}}_1 = -Gm_0 \frac{\pmb{r}_1}{r_1^3} - Gm_1 \frac{\pmb{r}_1}{r_1^3} + \sum_{j=2} \left[ Gm_j \frac{\pmb{R}_j - \pmb{R}_1}{ {\| \pmb{R}_j - \pmb{R}_1\|}^3} - G m_j \frac{\pmb{R}_j - \pmb{R}_0}{ {\| \pmb{R}_j - \pmb{R}_0\|}^3} \right] $$
<div class="l-gutter"><fig>({{ eq_njsakd }})</fig></div>

{% capture eq_keplerandperturb %}{% increment transit_equation_num %}{% endcapture %}
This can be further simplified to equation <fig>[{{ eq_keplerandperturb }}]</fig>,

$$ \ddot{\pmb{r}}_1 = -G\left(m_0 + m_1\right)\frac{\pmb{r}_1}{r_1^3} + \sum_{j=2} \left[ Gm_j \frac{\pmb{R}_j - \pmb{R}_1}{ {\| \pmb{R}_j - \pmb{R}_1\|}^3} - Gm_j \frac{\pmb{R}_j - \pmb{R}_0}{ {\| \pmb{R}_j - \pmb{R}_0\|}^3} \right] $$
<div class="l-gutter"><fig>({{ eq_keplerandperturb }})</fig></div>

{% capture eq_kepler %}{% increment transit_equation_num %}{% endcapture %}
In the 2-body case, where there is only a single body and star, this equation is the Keplerian equation of motion, as given in equation <fig>[{{ eq_kepler }}]</fig>. As the central star dominates the mass of the system, we can use $$ m_0 + m_i \approx m_0 $$ to simplify.

$$ \ddot{\pmb{r}}_i = -G\left(m_0+m_i\right)\frac{\pmb{r}_i}{r_i^3} \approx -Gm_0\frac{\pmb{r}_i}{r_i^3} $$
<div class="l-gutter"><fig>({{ eq_kepler }})</fig></div>

From this, we can see that the acceleration in Jacobian coordinates for an n-body system as given by equation <fig>[{{ eq_keplerandperturb }}]</fig> is the standard Keplerian with some perturbative acceleration applied,

{% capture eq_jacobi_kepler %}{% increment transit_equation_num %}{% endcapture %}
$$ \ddot{\pmb{r}}_i = -G\left(m_0+m_1\right)\frac{\pmb{r}_1}{r_1^3} + \delta\ddot{\pmb{r}}_1 $$
<div class="l-gutter"><fig>({{ eq_jacobi_kepler }})</fig></div>

{% capture eq_perturbaccel %}{% increment transit_equation_num %}{% endcapture %}
With the perturbing acceleration given in equation <fig>[{{ eq_perturbaccel }}]</fig>,

$$ \delta\ddot{\pmb{r}}_1 = \sum_{j=2} \left[ Gm_j \frac{\pmb{R}_j - \pmb{R}_1}{ {\| \pmb{R}_j - \pmb{R}_1\|}^3} - G m_j \frac{\pmb{R}_j - \pmb{R}_0}{ {\| \pmb{R}_j - \pmb{R}_0\|}^3} \right] $$
<div class="l-gutter"><fig>({{ eq_perturbaccel }})</fig></div>

{% capture eq_introducedterms %}{% increment transit_equation_num %}{% endcapture %}
If we introduce terms to the first fractional part, we have equation <fig>[{{ eq_introducedterms }}]</fig>.

$$\begin{split}
\delta\ddot{\pmb{r}}_1 &= \sum_{j=2} \left[ Gm_j \frac{\pmb{R}_j - \pmb{R}_1 + \pmb{R}_0 - \pmb{R}_0}{ {\| \pmb{R}_j - \pmb{R}_1 + \pmb{R}_0 - \pmb{R}_0\|}^3} - G m_j \frac{\pmb{R}_j - \pmb{R}_0}{ {\| \pmb{R}_j - \pmb{R}_0\|}^3} \right]\\
&= \sum_{j=2} \left[ Gm_j \frac{\pmb{R}_j - \pmb{R}_0 - \pmb{r}_1}{ {\| \pmb{R}_j - \pmb{R}_0 - \pmb{r}_1\|}^3} - G m_j \frac{\pmb{R}_j - \pmb{R}_0}{ {\| \pmb{R}_j - \pmb{R}_0\|}^3} \right]
\end{split}$$
<div class="l-gutter"><fig>({{ eq_introducedterms }})</fig></div>

We can consider the value of $$ \pmb{R}_j - \pmb{R}_0 $$ by using the general case in equation <fig>[{{ eq_jacobi }}]</fig>, to give the values for $$ \pmb{R}_j $$,

{% capture eq_nsjaldinjfkas %}{% increment transit_equation_num %}{% endcapture %}
$$\begin{split}
\pmb{r}_{n+1} &= \pmb{R}_{n+1} - \frac{\sum^n_{j=0}m_j\pmb{R}_j}{\sum^n_{j=0}m_j}\\
\pmb{R}_{n+1} &= \pmb{r}_{n+1} + \frac{\sum^n_{j=0}m_j\pmb{R}_j}{\sum^n_{j=0}m_j}
\end{split}$$
<div class="l-gutter"><fig>({{ eq_nsjaldinjfkas }})</fig></div>

{% capture eq_rjr0 %}{% increment transit_equation_num %}{% endcapture %}
Which can be evaluated to give equation <fig>[{{ eq_rjr0 }}]</fig>. Note the expression obtained in line 3, the value for $$ \pmb{R}_j - \pmb{R}_0 $$ is some combination of $$ \pmb{R}_k - \pmb{R}_0 $$ where $$ 0 < k < j $$.

$$\begin{split}
\pmb{R}_j - \pmb{R}_0 &= \pmb{r}_j + \frac{\sum^{j-1}_{k=0}m_k\pmb{R}_k}{\sum^{j-1}_{k=0}m_k} - \pmb{R}_0\\
&= \pmb{r}_j + \frac{\sum^{j-1}_{k=1}m_k\pmb{R}_k}{\sum^{j-1}_{k=0}m_k}\\
&= \pmb{r}_j + \sum^{j-1}_{k=1}{\mu_k\left(\pmb{R}_k-\pmb{R}_0\right)}\\
\end{split}$$
<div class="l-gutter"><fig>({{ eq_rjr0 }})</fig></div>

{% capture eq_rj0 %}{% increment transit_equation_num %}{% endcapture %}
We define a new value $$ \pmb{r}_{j0} $$, as a shorthand for $$ \pmb{R}_j - \pmb{R}_0 $$, given in equation <fig>[{{ eq_rj0 }}]</fig>,

$$ \pmb{r}_{j0} \equiv \pmb{R}_j - \pmb{R}_0 = \pmb{r}_j + \sum^{j-1}_{k=1}{\mu_k\left(\pmb{R}_k-\pmb{R}_0\right)} $$
<div class="l-gutter"><fig>({{ eq_rj0 }})</fig></div>

{% capture eq_jacobianmotion %}{% increment transit_equation_num %}{% endcapture %}
By combining equations <fig>[{{ eq_introducedterms }}]</fig> and <fig>[{{ eq_rjr0 }}]</fig>, we obtain equation <fig>[{{ eq_jacobianmotion }}]</fig>,

$$ \delta\ddot{\pmb{r}}_1 = \sum_{j=2} \left[ Gm_j \frac{\pmb{r}_{j0} - \pmb{r}_1}{ {\| \pmb{r}_{j0} - \pmb{r}_1\|}^3} - G m_j \frac{\pmb{r}_{j0}}{r_{j,0}^3} \right] $$
<div class="l-gutter"><fig>({{ eq_jacobianmotion }})</fig></div>

{% capture eq_jacobianmotion2 %}{% increment transit_equation_num %}{% endcapture %}
Which can be simplified slightly as equation <fig>[{{ eq_jacobianmotion2 }}]</fig>, which gives the perturbing acceleration on the transiting planet. Additionally, this can be expanded in a Legendre series to first order, giving the second line in equation <fig>[{{ eq_jacobianmotion2 }}]</fig>. 

$$\begin{split}
\delta\ddot{\pmb{r}}_1 &= \sum_{j=2} \left[ Gm_j\left( -\frac{\pmb{r}_1 - \pmb{r}_{j0}}{ {\| \pmb{r}_1 - \pmb{r}_{j0}\|}^3} - \frac{\pmb{r}_{j0}}{r_{j0}^3} \right)\right]\\
&= \sum_{j=2} \left[ -\frac{Gm_j}{r_j^3}\left( \pmb{r}_1 - 3\frac{\pmb{r}_1\cdot\pmb{r}_j}{r_j^2}\pmb{r}_j \right) + \mathcal{O}\left(\frac{r_1}{r_j}\right)^2\right]
\end{split}$$
<div class="l-gutter"><fig>({{ eq_jacobianmotion2 }})</fig></div>

{% capture eq_angpos %}{% increment transit_equation_num %}{% endcapture %}
To find the perturbed period of the transiting planet, we compute how this acceleration changes when averaged over the orbital period. The angular position of the transiting planet from the vantage point of earth, $$ \theta_1 $$, is given by the sum of its true anomaly, $$ f_1 $$, and argument of periapsis, $$ \omega_1 $$. This is gives equation <fig>[{{ eq_angpos }}]</fig>. As the eccentricity of this planet is assumed zero, the true and mean anomaly are equal. We can also introduce the transit number, $$ n_1 $$, and epoch $$ \tau_1 $$, to this expression.

$$\begin{split}
\theta_1 &= f_1 + \omega_1\\
&= n_1\left(t - \tau_1\right)\omega_1
\end{split}$$
<div class="l-gutter"><fig>({{ eq_angpos }})</fig></div>

{% capture eq_difangpos %}{% increment transit_equation_num %}{% endcapture %}
Differentiating equation <fig>[{{ eq_angpos }}]</fig> with respect to time gives equation <fig>[{{ eq_difangpos }}]</fig>.

$$ \dot{\theta}_1 = \dot{n}_1\left(t - \tau_1\right) + n_1 - n_1\dot{t}_{0,1} $$
<div class="l-gutter"><fig>({{ eq_difangpos }})</fig></div>

Following section 2.9 of <d-cite key="murraybook"></d-cite>, we express $$ \dot{n} $$ as a function of the semimajor axis: $$ \dot{n}_1 = -\frac{3n_1}{2a_1}\dot{a}_1 $$,

{% capture eq_mskofa %}{% increment transit_equation_num %}{% endcapture %}
$$\begin{split}
\dot{\theta}_1 &= \frac{3n_1\dot{a_1}}{2a_1}\left(t - \tau_1\right) + n_1 - n_1\dot{\tau}\\
&= n_1 \left(\frac{3\dot{a}_1}{2a_1}\left(t - \tau_1\right) + 1 - \dot{\tau}\right)
\end{split}$$
<div class="l-gutter"><fig>({{ eq_mskofa }})</fig></div>

{% capture eq_thetadot %}{% increment transit_equation_num %}{% endcapture %}
Expressing the time derivatives $$ \dot{a_1} $$, $$ \dot{\tau} $$, and $$ \dot{\omega} $$ in terms of $$ \ddot{r}_1 $$ gives equation <fig>[{{ eq_thetadot }}]</fig>,

$$ \dot{\theta}_1 = n_1\left(1 - \frac{2a_1^2}{G\left(m_0+m_1\right)}\sum_{j=2}\left[\frac{1}{2}\frac{Gm_ja_1}{r_j^3}\right]\right) $$
<div class="l-gutter"><fig>({{ eq_thetadot }})</fig></div>

This demonstrates why the orbital period of the transiting planet increases, the addition of planets in the system causes an increase in the effective mass interior to its orbit by $$ \frac{1}{2}m_j\left(\frac{a_1}{r_j}\right)^3 $$.

{% capture eq_perturbtransittime %}{% increment transit_equation_num %}{% endcapture %}
We can finally obtain the timing of the (N+1)th transit, given in equation <fig>[{{ eq_perturbtransittime }}]</fig> see Section 4 of <d-cite key="agol2018"></d-cite>.

$$\begin{split}
t - t_0 &= \int_{f_0}^{f_0 + 2\pi N}df_1\dot{\theta}_1^{-1}\\
&= \int_{f_0}^{f_0 + 2\pi N}df_1n_1^{-1}\left[1+\frac{1}{m_0+m_1}\sum_{j=2}\left[m_j\left(\frac{a_1}{r_j}\right)^3\right]\right]
\end{split}$$
<div class="l-gutter"><fig>({{ eq_perturbtransittime }})</fig></div>

Following <d-cite key="borkovits"></d-cite>, we can express the true anomaly of the transiting planet in terms of the true anomalies of the perturbing planets,

{% capture eq_trueanomfromother %}{% increment transit_equation_num %}{% endcapture %}
$$ df_1 = \sum_{j=2} \left[\frac{P_j}{P_1} \frac{r_j^2}{a_j^2\left(1-e_j^2\right)^{\frac{1}{2}}} df_j\right] $$
<div class="l-gutter"><fig>({{ eq_trueanomfromother }})</fig></div>

{% capture eq_orbitpos2 %}{% increment transit_equation_num %}{% endcapture %}
{% capture eq_newtrueanom %}{% increment transit_equation_num %}{% endcapture %}
As $$ r $$ depends on $$ f $$, we can introduce equation <fig>[{{ eq_orbitpos }}]</fig> (also given below as equation <fig>[{{ eq_orbitpos2 }}]</fig>) to equation <fig>[{{ eq_trueanomfromother }}]</fig>, giving equation <fig>[{{ eq_newtrueanom }}]</fig>.

$$ r_i = \frac{a_i\left(1-e_i^2\right)}{1+e_i\cos{f_i}} $$
<div class="l-gutter"><fig>({{ eq_orbitpos2 }})</fig></div>

$$\begin{split}
df_1 &= \sum_{j=2} \left[\frac{P_j}{P_1} \frac{1}{a_j^2\left(1-e_j^2\right)^{\frac{1}{2}}} \left(\frac{a_j\left(1-e_j^2\right)}{1+e_j\cos{f_j}}\right)^2 df_j \right] \\
&= \sum_{j=2} \left[ \frac{P_j}{P_1} \frac{\left(1-e_j^2\right)^{\frac{3}{2}}}{\left(1+e_j\cos{f_j}\right)^2} df_j\right]
\end{split}$$
<div class="l-gutter"><fig>({{ eq_newtrueanom }})</fig></div>

{% capture eq_perturbtimenewvar %}{% increment transit_equation_num %}{% endcapture %}
As the original variable of integration in equation <fig>[{{ eq_perturbtransittime }}]</fig>, $$ f_1 $$, changes due to the perturbation, we rewrite the integral in terms of the unperturbed $$ f_j $$. As an approximation, we consider only the gravitational forces acting on the transiting planet, and treat the perturbing planets as following Keplerian orbits. The substitution for $$ df_1 $$ is given in equation <fig>[{{ eq_newtrueanom }}]</fig>, and gives equation <fig>[{{ eq_perturbtimenewvar }}]</fig>.

$$ t-t_0 = \sum_{j=2}\left[\int_{f_0}^{f_0 + 2\pi N}\right. \left( df_jn_1^{-1}\frac{P_j}{P_1}\frac{\left(1-e_j^2\right)^{\frac{3}{2}}}{\left(1+e_j\cos{f_j}\right)^2} \right. \left. \left. \cdot \left(1+\frac{m_j}{m_0+m_1}\left(\frac{a_1}{r_j}\right)^3\right)\right)\right] $$
<div class="l-gutter"><fig>({{ eq_perturbtimenewvar }})</fig></div>

{% capture eq_finaltransittime %}{% increment transit_equation_num %}{% endcapture %}
Which can be evaluated to give the timing of the (N+1)th transit, as shown in equation <fig>[{{ eq_finaltransittime }}]</fig>.

$$ t - t_0 = NP_1 + \frac{P_1^2}{2\pi\left(m_0+m_1\right)} \cdot \sum_{j=2}\left[\frac{m_j \left(f_j+e_j\sin{f_j}\right)\left(1-e_j^2\right)^{\frac{-3}{2}}}{P_j}\right] $$
<div class="l-gutter"><fig>({{ eq_finaltransittime }})</fig></div>

{% capture eq_TTVperturb %}{% increment transit_equation_num %}{% endcapture %}
To find the departure from linear ephemerides, and thus obtain the TTV, we subtract the mean transit time $$ NP_1 $$ from equation <fig>[{{ eq_finaltransittime }}]</fig>. As the $$ f_j $$ terms also includes the mean motion, $$ n\left(t-\tau_j\right) $$, of the perturbing planets, we subtract that too, giving equation <fig>[{{ eq_TTVperturb }}]</fig>. We have now found a model of TTV caused by the perturbation due to outer planets.

$$ \delta{t_1} = \frac{P_1^2}{2\pi\left(m_0+m_1\right)} \cdot\sum_{j=2}\left[\frac{m_j\left(f_j - n_j\left(t-\tau_j\right)+e_j\sin{f_j}\right)\left(1-e_j^2\right)^{\frac{-3}{2}}}{P_j}\right] $$
<div class="l-gutter"><fig>({{ eq_TTVperturb }})</fig></div>

### Parameter search

With a suite of analytical TTV models at our disposal, we need to determine methods for fitting to simulated or physical TTV signals, and determining the marginalization and uncertainty associated with the fit.

#### Optimisation

To determine this set of best fit parameters, we leverage the field of computational optimisation and the large quantity of implementations that have been written for it through the SciPy package <d-cite key="scipy"></d-cite>. There are various metrics and methods for optimisation, the most notable of which are discussed below.

##### Least squares regression

An appealing yet naïve approach to parameter determination, where the squared sum of the residuals to a fit is minimised. While this has benefits in the form of being expressible as linear algebra, and efficient implementation in many programming packages, it suffers on two accounts:

Least squares is a method of local minimisation, there is no way of determining if a solution is the global optimum without searching all possible solutions. Searching through all solutions is described by the brute-forcing algorithm, the complexity of which grows exponentially with the number of model parameters. This exponential growth leads to computationally expensive searches.

This method will also often under- or over-estimate the fitting parameters, as the residuals to the fit is not necessarily a good metric from initial parameters. This is most susceptible to random error in the data, and is less an issue on larger datasets.

##### Maximum likelihood

{% capture eq_likelihood %}{% increment transit_equation_num %}{% endcapture %}
Maximum likelihood estimation, or MLE, provides a numerical optimisation method for models that more accurately describe real world data, as opposed to the more idealised case within which linear regression was originally formulated. The logarithm of the likelihood function for Bayesian analysis is given in equation <fig>[{{ eq_likelihood }}]</fig>

$$ \ln{p(y | x, \theta, M)} = -\frac{1}{2}\sum_n\left[\frac{\left(y_n - M(x, \theta)\right)^2}{s_n^2} + \ln{\left(2\pi s_n^2\right)}\right] $$
<div class="l-gutter"><fig>({{ eq_likelihood }})</fig></div>

Where $$ x $$ and $$ y $$ is the set of data, $$ M $$ is the model to be fit, $$ \theta $$ the parameters of the model, and $$ s $$ is given by:

{% capture eq_sghjbdkmlas %}{% increment transit_equation_num %}{% endcapture %}
$$ s_n^2 = \sigma_n^2 + f^2 \left[M(x, \theta)\right]^2 $$
<div class="l-gutter"><fig>({{ eq_sghjbdkmlas }})</fig></div>

Where the additional $$ \sigma $$ is the error on each data point. The logarithm of the likelihood is used due to its concavity, and that a given log likelihood is the sum of individual log likelihoods, providing an intuitive base for usage.

##### Minimisation

In computational parameter optimisation, it is standard to try to minimise, rather than maximise, the values of a function within a given parameter space. As we have highlighted the usefulness of maximum likelihood estimation, it is useful to quickly adapt this to the computational workflow. This is very easily achieved by simply attempting to minimise the *negative* log likelihood of a model.

As mentioned in [least squares regression](#Least-squares-regression), it is preferable to find, or approximately find, the global optimal parameters, two methods for which are differential evolution <d-cite key="diffEvo"></d-cite> and dual annealing <d-cite key="dualAnnealing"></d-cite>. These global optimisation methods are accessed through the `scipy.optimise` python package <d-cite key="scipy"></d-cite>.

Differential evolution takes inspiration from evolutionary science, and attempts to optimise a problem through iterative improvements to some metaheuristic, such as the log likelihood, of the solution. This is specifically achieved by initialising some large set of "agents", each with random starting parameters, and allowing them to converge to the global solution.

Dual annealing implements a different metaheuristic to differential evolution, taking its name from the controlled cooling of material (annealing) used in metallurgy. The method begins by considering the neighbouring parameters $$ s^* $$ to its current solution $$ s $$, and probabilistically deciding to move between those states. This probabilistic method is dependent upon the "Temperature" of each state, which is defined as some function of the likelihood of each state. The free energy of the system defines how much each parameter may vary, and is slowly reduced, eliminating solutions with lower likelihoods. This continues until the free energy is zero, and the system has found the optimum with maximum likelihood.

As a typical final step in global optimisation, we polish the found parameters with some local optimisation method. The specific tool used in this project is the bounded limited memory Broyden–Fletcher–Goldfarb–Shanno algorithm <d-cite key="ByrdALM"></d-cite><d-cite key="ZhuAlgorithmL"></d-cite>, accessed through the `scipy.optimise.minimize` method call. This method, like many other quasi-newton algorithms, iteratively converges to an optimal solution through gradient descent This is specifically achieved using the hessian matrix of the function, the square matrix of second-order partial derivatives with respect to the free parameters of the function.

#### Model comparison

In the case where models have an equivalent set of parameters, simply comparing the value of the maximum likelihood is sufficient to draw conclusions about their accuracy. If the number of parameters between models is inconsistent, this approach will naturally result in overfitting.

This is especially relevant for our transit models. For example, the initial TTV model seen in equation <fig>[{{ eq_ttvbarycentre }}]</fig> has two fixed parameters and an additional four free parameters per body in the system, while the extension to this, as seen in equation <fig>[{{ eq_TTVeccentric }}]</fig> has four fixed parameters and an additional five free parameters per body in the system. As the number of bodies in the system is an additional free parameter, some method of comparison is required.

##### Akaike information criterion

To determine the quality for each model, some weighting dependent on their free parameters is introduced to the likelihood value <d-cite key="AIC"></d-cite><d-cite key="AIC2"></d-cite>.

{% capture eq_aic %}{% increment transit_equation_num %}{% endcapture %}
$$ \text{AIC} = 2 k - 2 \ln{L} $$
<div class="l-gutter"><fig>({{ eq_aic }})</fig></div>

In the case where a model has $$ k $$ free parameters, with a maximum likelihood $$ L $$, the AIC value is as given in equation <fig>[{{ eq_aic }}]</fig>. This provides a middle ground between goodness of fit, and model simplicity, handling both under- and over-fitting simultaneously.

##### Corrected Akaike information criterion

{% capture eq_aicc %}{% increment transit_equation_num %}{% endcapture %}
Where the sample size is small, the standard AIC method can lead to overfitting, and a correction is required to better describe the fit <d-cite key="AICC"></d-cite>. This extension to AIC attempts to fix the overfitting by introducing a further penalty from the number of data points, $$ n $$, as seen in equation <fig>[{{ eq_aicc }}]</fig>.

$$ \text{AICc} = AIC + \frac{2k^2 + 2k}{n-k-1} = \frac{2kn}{n-k-1} - 2 \ln{L} $$
<div class="l-gutter"><fig>({{ eq_aicc }})</fig></div>

The exact form of the expression for the corrected Akaike information criterion (AICc) is not fixed, but is determined for the individual models to be scored. The equation given in <fig>[{{ eq_aicc }}]</fig> is the one used in this project, and is not representative of some general AICc expression. The commonality between all AICc expressions is the dependence on $$ k^2 $$, as all AICc are second-order estimates.

##### Bayesian information criterion

Another model selection metric closely related to the corrected Akaike information criterion, BIC introduces a larger penalty for free parameters by weighting them with the number of observed data points <d-cite key="BIC"></d-cite>.

{% capture eq_bic %}{% increment transit_equation_num %}{% endcapture %}
$$ \text{BIC} = k \ln{n} - 2 \ln{L} $$
<div class="l-gutter"><fig>({{ eq_bic }})</fig></div>

In the case where a model has $$ k $$ free parameters, $$ n $$ data points, and a maximum likelihood $$ L $$, the BIC value is as given in equation <fig>[{{ eq_bic }}]</fig>. Models that have lower BIC values are generally preferred, though this does not always yield the optimal fit.

#### Markov Chain, Monte Carlo

To determine parameter bounds, a Markov Chain Monte Carlo (MCMC) method is used through the `Emcee` package <d-cite key="emcee"></d-cite>. This class of algorithms use the probability distribution of a function to construct a sample chain that converges to the desired distribution, typically one that is normally distributed around the true parameters. This begins very similarly to the differential evolution optimisation technique described in [this section](#Minimisation), where a set of "walkers" are initialised with arbitrary starting parameters, and allowed to walk around the parameter space according to some ensemble method.

{% capture eq_stretch %}{% increment transit_equation_num %}{% endcapture %}
The ensemble method used for this project is the stretch move <d-cite key="stretchMove"></d-cite>, a method that significantly outperforms the more traditional Metropolis-Hastings algorithm <d-cite key="MH-MCMC"></d-cite>. The position of a walker, $$ X_k $$, is determined by randomly selecting another walker, $$ X_j $$, and proposing a new position by interpolating between the two with some variable randomly drawn from the distribution, as given in equation <fig>[{{ eq_stretch }}]</fig>, also see equation 7 in <d-cite key="emcee"></d-cite>.

$$ X_k(t) \xrightarrow{} Y = X_j + Z\left[X_k(t) - X_j\right] $$
<div class="l-gutter"><fig>({{ eq_stretch }})</fig></div>

## Results / Discussion

### Observations

{% capture fig_hatp13b1 %}{% increment transit_figure_num %}{% endcapture %}
{% capture fig_hatp13b2 %}{% increment transit_figure_num %}{% endcapture %}
Six transit observations were planned at the beginning of this project to observe four different exoplanetary systems: HAT-P-13b, HAT-P-44b, and K2-19b. Of those, only two observations were made, both of HAT-P-13b, and are given in figures <fig>[{{ fig_hatp13b1 }}]</fig> and <fig>[{{ fig_hatp13b2 }}]</fig>. Significant cloud cover prevented further observations, and severely hampered the observation made on 2022-02-27 (figure <fig>[{{ fig_hatp13b2 }}]</fig>).

<div class="row">
    <div class="col-sm g-0 imgfig">
        {% include figure.html path="assets/img/TransitProject/detrended_model.jpg" %}
    </div>
</div>
<div class="caption">
    Figure {{ fig_hatp13b1 }}. De-trended transit light curve for an observation of HAT-P-13b taken 2022-02-24 and analysed with HOPS <d-cite key="HOPS"></d-cite>. Note the anomaly near the mid-transit time due to light cloud cover. Reported $$ \frac{R_p}{R_*} $$ is $$ 0.0844\pm{0.0013} $$ <d-cite key="hat-p-13b"></d-cite>.
</div>

<div class="row">
    <div class="col-sm g-0 imgfig">
        {% include figure.html path="assets/img/TransitProject/detrended_model2.jpg" %}
    </div>
</div>
<div class="caption">
    Figure {{ fig_hatp13b2 }}. De-trended transit light curve for an observation of HAT-P-13b taken 2022-02-27 and analysed with HOPS <d-cite key="HOPS"></d-cite>. Note the large residuals and missing data in the second half of the transit, caused by clouds completely obscuring the star for several hours.
</div>

The light-curves have been fit with HOPS <d-cite key="HOPS"></d-cite>, and have provided values for $$ \frac{R_p}{R_*} $$ close to the reported literature <d-cite key="hat-p-13b"></d-cite> when considering the large variance in flux caused by suboptimal weather conditions.

{% capture fig_hatp13b2error %}{% increment transit_figure_num %}{% endcapture %}
The observation on 2022-02-27, given in figure <fig>[{{ fig_hatp13b2 }}]</fig>, shows large residuals and has had data points after the mid-transit time removed. This was due to large cloud cover that reduced sky visibility to $$ 0\% $$ for several hours during the middle of the transit. Re-introducing these data points to the HOPS fitting, the result in figure <fig>[{{ fig_hatp13b2error }}]</fig> is obtained. The relative change in flux due to the cloud cover is larger than the occlusion depth of the transit by a significant factor, causing hops to fit transit egress to this position.

<div class="row">
    <div class="col-sm g-0 imgfig">
        {% include figure.html path="assets/img/TransitProject/detrended_model2_error.jpg" %}
    </div>
</div>
<div class="caption">
    Figure {{ fig_hatp13b2error }}. De-trended transit light curve for the observation of HAT-P-13b taken 2022-02-27 without the central data points removed. Note how the relative change in flux due to the cloud-cover is larger than the predicted occlusion depth.
</div>
### Light curve analysis

{% capture fig_hats46tess %}{% increment transit_figure_num %}{% endcapture %}
<div class="row">
    <div class="col-sm g-0 imgfig">
        {% include figure.html path="assets/img/TransitProject/TESSLightcurve_Hats-46.pdf" %}
    </div>
</div>
<div class="caption">
    Figure {{ fig_hats46tess }}. Combined light curve (top) and TTV data (bottom) for HATS-46, as observed by the <em>TESS</em> spacecraft. Only HATS-46b transits the star, and a large disparity is noted in the middle of the dataset due to observations over multiple <em>TESS</em> sectors.
</div>

{% capture fig_Wasp8tess %}{% increment transit_figure_num %}{% endcapture %}
<div class="row">
    <div class="col-sm g-0 imgfig">
        {% include figure.html path="assets/img/TransitProject/TESSLightcurve_Wasp-8.pdf" %}
    </div>
</div>
<div class="caption">
    Figure {{ fig_Wasp8tess }}. Combined light curve (top) and TTV data (bottom) for Wasp-8, as observed by the <em>TESS</em> spacecraft. Note the large transit depths as compared to HATS-46, and the correspondingly small uncertainties in the TTV residuals that result from that.
</div>

With *TESS* light curves collected from the Mikulski archive for space telescopes, additional mid-transit times could be computed to complement those collected from the exoplanet transit database and ExoClock database, as was briefly touched upon in [this section](#Project-objectives).

#### De-trending

Many of the *TESS* light curves show strong long-term trends that can make transit detection difficult. To de-trend the data, a Gaussian process is fit to the out-of transit data, using the linear ephemerides for the planetary system to deduce the locations of transits. This was performed using an approximate Matern kernel using the Juliet wrapper <d-cite key="juliet"></d-cite> to the Celerite package <d-cite key="celerite"></d-cite>. This gives the black line seen in figures <fig>[{{ fig_hats46tess }}]</fig>, and <fig>[{{ fig_Wasp8tess }}]</fig>, which very closely matches the overall light curve trend.

#### Transit fitting

Transit fits were then performed on the de-trended data, using the Juliet wrapper to both the Batman <d-cite key="batman"></d-cite>and Dynesty <d-cite key="dynesty"></d-cite> packages. The parameters for the transit models are initialised by randomly selecting from the priors, and iteratively walked through parameter space. The general parameters for the exoplanet are returned to the posteriors of the fit, which adequately match the confirmed literature despite having few transits and no initial parameters to work from.

{% capture tab_hats46b %}{% increment transit_table_num %}{% endcapture %}
Taking the posteriors found for HATS-46b, as compared to the detection paper <d-cite key="hats46b"></d-cite>, we have the results as given in table <fig>[{{ tab_hats46b }}]</fig>