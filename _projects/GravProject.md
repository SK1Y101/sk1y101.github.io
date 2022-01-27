---
layout: distill
title: Bachelors Thesis
longtitle: Distinguishing Intermediate Mass Black Hole Mergers from Short Duration Glitches
description: Using LIGO data to filter glitch events when searching for intermediate mass black holes
img: assets/img/GWProject/190521-3hr-GravPlot.png
importance: 1
category: work

date: 2021-12-24

authors:
  - name: Jack Lloyd-Walters
    url: "https://sk1y101.github.io"

links:
  github: SK1Y101/GWProject
  pdf: GWProjectFinalReport.pdf
  url:

# Optionally, you can add a table of contents to your post.
# NOTES:
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - we may want to automate TOC generation in the future using
#     jekyll-toc plugin (https://github.com/toshimaru/jekyll-toc).

bibliography: gravproject.bib

toc:
  - name: Abstract
  - name: Acknowledgements
  - name: Introduction
    subsections:
      - name: The Intermediate Mass Black Hole Problem
      - name: Glitch Events
      - name: Moving Forward
  - name: Theory
    subsections:
      - name: Constructing a Glitch
      - name: Matched filtering
  - name: Methodology
    subsections:
      - name: The Search
        subsubsections:
          - name: Data collection
          - name: Template Generation
          - name: Signal Processing
      - name: Compiling results
        subsubsections:
          - name: Event Detection
          - name: Graphical Output
  - name: Results
  - name: Conclusion

# Below is an example of injecting additional post-specific styles.
# If you use this post as a template, delete this _styles block.

---

## Abstract

Glitches are a frequent occurrence with LIGO data, on the order of 10 an hour, and represent unwanted noise when searching for gravitational wave signals. Due to their similarity to IMBH merger events, they represent an obstacle to any search that deals with higher mass black holes.
With a viable model of these glitch events, a full search could more easily distinguish IMBH mergers from short duration glitches. The glitch model created for this report was found to be accurate when searching against LIGO data using traditional matched filtering, and showed high similarity to events identified using the omicron scan, despite the difference in methods for detection.
This glitch model was shown to not hinder a search for IMBH's, as merger templates for GW190521 still responded more strongly than the glitch model, showing it's safety in respect to true mergers. As such, this could pose a viable model for an extended search across a much larger swathe of LIGO data, with higher mass resolutions providing a logical improvement.

***

## Acknowledgements

I would like to thank my supervisor, Dr Andrew Lundgren, for providing immeasurable support in furthering my understanding of the topic and the programming challenges I encountered throughout, as well as for providing feedback every week on whatever work I happened to show.

I would also like to thank the members of the GWastro Slack group for their assistance with the many PyCBC and Jupyter Issues I encountered while programming for this project, of which there were many, as well as providing a great audience for the presentation based on this report.

To that end, I of course extend my thanks to the entire PyCBC team, both for the tutorial documentation that allowed me to learn this package, and for the vast suite of functions that catered to almost any required programming task. Alongside this, my gratitude to Python, Numpy and Scipy, for their huge array of tools, and an enjoyable decade of programming.

Finally, I would like to thank the Ligo Collaboration for providing the server environment that allowed this search to run, as well as all data collected that have made Gravitational wave astronomy possible.

***

## Introduction

### The Intermediate Mass Black Hole Problem

Since their inception a century ago, we have found a multitude of black holes spanning the very small, to the monstrously large. At the lowest range are stellar black holes, remnants of the largest stars whose mass is less than $$ 10^2 M_\odot $$. In contrast are the supermassive black holes, whose mass is sufficient to dominate the evolution of galaxies, and are thought to reside with their cores. Within this continuous range of known compact objects is an odd discontinuity; black holes whose mass ranges from $$ 10^2 - 10^5 M_\odot $$.

While a handful of candidates for these intermediate mass black holes (IMBH's) have been found, only a single one has ever been confirmed. This object, GW190521 <d-cite key="GW190521"></d-cite>, was found on the $$ 19^{th} $$ of may 2019 following a detection trigger in multiple detectors, which was thought to result from the merger of two large stellar mass black holes. This merger event, characterised by a short duration and low peak frequency, sits squarely within the area that LIGO is most sensitive to, raising questions as to their observed scarcity.

As the largest stars reach the end of their lives, temperatures and pressures within their cores are sufficient for pair creation to play a dominant role in stellar evolution. As stars support themselves against gravitational collapse by way of radiation pressure, a portion of these photons becoming particle-antiparticle pairs destabilises the previously established equilibrium <d-cite key="pair_instability_supernovae"></d-cite>.

\begin{figure}[h!]
    \includegraphics[width=.49\textwidth]{Images/2560px-Supernovae_as_initial_mass-metallicity.svg.png}
    \includegraphics[width=.49\textwidth]{Images/2560px-Remnants_of_single_massive_stars.svg.png}
    \caption{Supernovae types, and remnant object, given initial star mass and metallicity. credit: <d-cite key="remnanttype"></d-cite> <d-cite key="supernovaetype"></d-cite>}
    \label{fig:pairinst}
\end{figure}

For stars between $$ 100 $$ and $$ 130 M_\odot $$ this results in several pulsations, where increased pair production causes the star to contract, raising core fusion rate until a new equilibrium is established, with several solar mass of material ejected from the outermost layers of the star in the process. This continues until the star falls below the required limit for pair production, and evolves further as a regular (albeit massive) star.

Stars within the $$ 100 $$ and $$ 250 M_\odot $$ boundary experience a much more energetic suite of pair production events due to their increased pressures. While smaller stars can eventually reach a new equilibrium after the initial pair production, these stars experience a runaway feedback loop. Overpressure in the star is sufficient to completely consume the core as a seconds-long thermonuclear explosion, blowing apart the star in a highly destructive and energetic pair-instability supernova <d-cite key="pair_instability_supernovae"></d-cite>. We can see this in figure \ref{fig:pairinst} as a blank area in the two graphs.

Further massive stars, those above $$ 250 M_\odot $$ undergo photodisintegration before pair-production can completely consume the star. Photodisintegration is an endothermic (energy absorbing) process whereby a nucleus absorbs a gamma ray, enters an excited state, and immediately deexcites by emitting one or more subatomic particles. This prevents thermonuclear runaway, as distinct fusion processes require specific atomic isotopes, and the star eventually collapses completely in on itself to form a massive black hole <d-cite key="Fraley1968"></d-cite>. While this is the expected evolutionary path of a star this massive, very few, if any, of these stars besides the very first in the universe are expected to have formed.

From this, we expect that intermediate mass black holes form only through gravitational mergers, though a secondary problem arises: Supermassive black holes. If our model of bottom up formation is correct, SMBH's form through mergers of massive seed black holes, either typical IMBH's or direct collapse black holes <d-cite key="seed_black_holes"></d-cite>. Given the high population of both SMBH's and stellar mass black holes, we should expect to see many remnants within the IMBH range.

### Glitch Events

Within any arbitrary segment of gravitational strain data are glitch events. Glitches are, broadly speaking, short duration non-Gaussian wave-forms with similar spectral properties to actual merger events, though without an astrophysical source, and an almost unlimited loudness. These occur frequently, on the order of ten an hour, and are independent between detectors, with a rare chance that two detectors may see a chance overlap of independent glitches.

\begin{figure}[h!]
    \includegraphics[width=.49\textwidth]{Images/H1-LOCKED_HOFT_OMICRON_TRIGGERS-1242432018-86400.png}
    \hfill
    \includegraphics[width=.49\textwidth]{Images/L1-LOCKED_HOFT_OMICRON_TRIGGERS-1242432018-86400.png}
    \caption{Omicron scan of the Hanford and Livingston detectors, demonstrating the frequency of glitch events}
    \label{fig:OmicronGlitches}
\end{figure}

Over years of LIGO observation, we have seen an entire zoo <d-cite key="GlitchZoo"></d-cite> of glitches. To trim what would otherwise be a broad topic, the particular glitches that share features with the blip (\textbf{B}and \textbf{L}imited \textbf{I}m\textbf{P}ulse) glitches will be the main focus of this paper, with an example shown in figure \ref{fig:0}. This figure shows a specific class of time-frequency diagram called the "QTransform" which shows the energy content of each frequency in the detector strain changes over time. \label{Glitch_Properties}

\begin{figure}[h!]
    \includegraphics[width=\textwidth]{Images/4pEe3veoKk.png}
    \caption{Sample Glitch event in the Livingston Detector. The colour scale is the normalised energy for this time range}
    \label{fig:0}
\end{figure}

From this plot we can see how short a duration blip glitches are compared to mergers, significantly less than a tenth of a second for this specific glitch. As it will be important later, we can also see that this glitch occurs between the $$ 16Hz $$ and $$ 1024Hz $$ range, with a greater proportion of the glitch occurring at the lower end of this frequency range.

\begin{figure}[h!]
    \includegraphics[width=\textwidth]{Images/GW190828_063405.png}
    \caption{Spectral plot for $GW190828_063405$}
    \label{fig:GW}
\end{figure}

To further visually distinguish glitches from mergers, figure \ref{fig:GW} shows the spectral plot of a merger event. Note how this event is asymmetric, unlike the blip glitch in figure \ref{fig:0}, due to the characteristic chirp of a gravitational in spiral.

While the majority of glitches can be easy to dismiss, as they have Signal-to-Noise ratios in the hundreds to thousands, it is the quietest that present the largest problem. Those that have Signal-to-Noise ratios (SNR's) on the same scale as true mergers, between $$ 10 $$ and $$ 30 $$, have near identical properties to IMBH events.

Due to their similarity with short duration mergers, there exists the potential that the curious deficit of IMBH merger events could be due to incorrect labelling as glitches. This report will progress toward a search for glitch-like IMBH mergers that may help to place limits on the number of known high-mass events.

### Moving forward

In order to further filter out glitch events, especially those quieter ones that mimic IMBH mergers, it would be best to create a template model that accurately represents these glitch events. Particularly, it should have near identical physical characteristics, and should respond to signal processing in much the same way as the ones encountered within LIGO data.

With an appropriate model created, a search through LIGO data using the same methods that have found gravitational mergers should be able to locate glitch events. Running this search against data that contains both known glitch and merger events should be an excellent test of theory, and allow any fine tuning to more accurately determine the nature of each detection event.

Finally, by comparing and contrasting each of these searches between multiple detector data, we should be able to determine if any glitches (or mergers) are true glitch events, or misconstrued IMBH mergers. Extending this search further into unknown data should also allow the potential discovery of new IMBH events, and potentially a better understanding into how to accurately model and remove these glitch events.

To do this, the Python PyCBC <d-cite key="PyCBC"></d-cite> package will be used inside a Jupyter notebook running on an external LIGO server. This should expose all required LIGO data and computational power to completely achieve the goals laid out above.

***

## Theory

### Constructing a Glitch

Before attempting to construct a glitch template, it is prudent to list the known properties of glitches found within LIGO data:

\begin{itemize}
    \item Merger similarity:

    Glitches respond very similarly to mergers when matched filtering for merger templates. They also exhibit similar spectral properties to known merger events, as touched on in section \ref{Glitch_Properties}.

    \item Duration:

    Glitches are very short duration, typically on the order of tenths of a second. The specific glitches this paper focuses on, blip glitches, are time-symmetric, unlike merger events that tend to have an initial chirp.

    \item Loudness:

    Glitches can vary from near-undetectable, to completely overwhelming, with an almost continuous distribution between the two. Any given glitch can have any given loudness, with no obvious relation.
\end{itemize}

\begin{figure}[h!]
    \includegraphics[width=\textwidth]{Images/60 merger.png}
    \caption{Merger between two $$ 60 M_\odot $$ black holes}
    \label{fig:1}
\end{figure}

In order to address the first point and ensure our glitch template has similar spectral features and properties to a merger event, we will first start with a merger template as shown in figure \ref{fig:1}. While this does give us the characteristic spectrum we desire, with most of the energy contained in lower frequencies, this does come with the side-effect of introducing the characteristic merger chirp into our template.

\begin{figure}[h!]
    \includegraphics[width=\textwidth]{Images/60 merger (freq).png}
    \caption{Fourier transform of the merger}
    \label{fig:2}
\end{figure}

As there are very few things that can be done here without removing required information, The template will then be converted to a frequency series by way of Fourier transform as shown in figure \ref{fig:2}. This representation encodes each frequency of a waveform as a complex number, where the argument is the phase of each frequency, and the magnitude is its amplitude. This representation thus allows us to address the second point above.

\begin{center}
    Standard form
    $$
        z = a + bj
    $$
    $$
        a = \text{Re}(z)
    $$
    $$
        b= \text{Im}(z)
    $$
\end{center}

\begin{center}
    Polar form
    $$
        z = r ( \cos(\theta) + j \sin(\theta) ) = r e^{j \pi \theta}
    $$
    $$
        r = \text{mod}(z) = \sqrt{a^2 + b^2}\label{eq:2}
    $$
    $$
        \theta = \text{arg}(z) = \arctan(\frac{b}{a})\label{eq:1}
    $$
\end{center}

One way of representing short duration is to say that all frequency information is in phase. As the phases of each individual sinusoidal become aligned, so too does their central peaks, causing constructive interference around the centre and destructive interference elsewhere. As we know that phase information for each frequency is the argument of each complex number, a useful next step would be setting this to zero without affecting the modulus (and subsequently amplitude) for each frequency.

From \ref{eq:1}, we can see an easy way of achieving this is setting $$ b $$, or the imaginary part, to zero. To retain the amplitude information, \ref{eq:2} Shows that $$ r^2 = a^2 + b^2 $$, and so $$ a $$, or the real part, must be set to the modulus. This is, conveniently enough, what the `numpy.abs()` function does, the output of such shown in figure \ref{fig:3}.

\begin{figure}[h!]
    \includegraphics[width=\textwidth]{Images/60 glitch.png}
    \caption{All phase information removed}
    \label{fig:3}
\end{figure}

Finally, using an Inverse Fourier transform to return to the time domain, we should see that our template now occurs almost exclusively at $$ t=0 $$, as shown in figure \ref{fig:4}. As the Inverse Fourier Transform expects a sequence of complex numbers, care should be taken to avoid completely removing the imaginary part in the step above. As `numpy.abs()` automatically does this, the glitch frequency series had to be recast using `numpy.astype("complex-128")`, which converts each number to a complex double floating point value (in essence, appending $$ 0j $$ to what would otherwise be a sequence of reals). There is an animation of the merger to glitch conversion hosted https://github.com/SK1Y101/GWProject/blob/main/Animation of Merger converting to Glitch.gif as part of this project's Github Repository <d-cite key="GithubRepo"></d-cite>.

\begin{figure}[h!]
    \includegraphics[width=\textwidth]{Images/60 glitch (time).png}
    \caption{Inverse Fourier transformed into the time domain}
    \label{fig:4}
\end{figure}

To assess how similar our glitch model and merger model are, we will use the `PyCBC.filter.match()` function to compute their similarity. This function takes two templates and yields two numbers, $$ \epsilon $$ and $$ \phi $$. $$ \epsilon $$ is a measure between 0 and 1 of their correlation, where 0 is completely dissimilar and 1 is completely identical, and $$ \phi $$ is the time offset between the two signals required to obtain the match. As we are only concerned with how correlated the two signals are at this stage, we can discard $$ \phi $$.

To see how the similarity, or $$ \epsilon $$, between glitch and merger varies as a function of mass, we can create a bank of template mergers between two equal mass black holes across a range of masses, and a bank of glitches from those same mergers. While it would not be difficult to use unequal mass templates (such as a glitch formed from a $$ 30 M_\odot $$ - $$ 50 M_\odot $$ merger), the equal mass templates are more than appropriate for our needs. Figure \ref{fig:6} shows the result of this operation, where the glitches and templates were generated with symmetric masses between $$ 10 $$ and $$ 300 M_\odot $$. The z axis, which shows $$ \epsilon $$, is also represented proportionally with a colour scale.

\begin{figure}[h!]
    \includegraphics[width=\textwidth]{Images/Epsilon_Correlation_2.1.png}
    \caption{Epsilon correlation ($$ \epsilon $$) between a bank of Glitches and Mergers}
    \label{fig:6}
\end{figure}

We can see that, for low mass merger events, the value of $$ \epsilon $$ does not vary strongly as the mass of each glitch increases. This also shows that low mass mergers do not look particularly like glitch events, as $$ \epsilon $$ does not rise above $$ 0.2 $$ until the symmetric merger mass is above $$ 50 M_\odot $$, which is already more massive than all mergers observed except GW190521 <d-cite key="GW190521"></d-cite>.

The short discontinuities in the graph is an artefact of the computation required to calculate $$ \epsilon $$. The likely culprit is the frequency cutoff chosen when generating the templates, for this particular computation, only information above $$ 10Hz $$ was retained. This would explain why the graph is continuous at low masses, as these mergers contain a lot of information in the $$ 100Hz $$-$$ 300Hz $$, while discontinuous at High masses, which occur mostly within the $$ 1Hz $$-$$ 30Hz $$ regime and thus are missing some of their frequency information.

### Matched filtering

Matched filtering <d-cite key="matchedFilter"></d-cite> is the main method by which the bulk of this search is performed. This tool is particularly powerful for identifying a known signal within data that contains Gaussian noise, as it is *mathematically provable* [find source maybe?] to be the optimum linear filter. As such, it underpins a lot of work in RADAR and similar subsystems, as they too require filtering known data from noise. The two deceptively simple equations that describe it's working are given below:

$$
    \rho = \frac{1}{\sigma} \int \frac {d(f) h^*(f)}{S(f)} df
    \label{eq:match1}
$$
$$
    \sigma^2 = \int \frac {h(f) h^*(f)}{S(f)} df
    \label{eq:match2}
$$

The output of the matched filter function is the signal-to-noise (SNR) ratio for a given template $$ h $$ against data $$ d $$, represented by $$ \rho $$ in equation \ref{eq:match1}. The $$ \sigma $$ term given is the auto-correlation of the template, and is used to normalise the SNR output.

We can see in equation \ref{eq:match2} that we multiply the template with its complex conjugate. This operation yields the amplitude squared of the template, with the imaginary portion collapsing to zero, an operation which can be demonstrated with little effort.

$$
    z = a + bj
$$
$$
    z^* = a - bj
$$
$$
    zz^* = (a + bj)(a - bj)
$$
$$
    zz^* = a^2 - abj + abj - b^2j^2
$$
$$
    zz^* = a^2 + b^2 = \text{mod}(z)^2
$$

Having obtained the amplitude squared of the template, we divide through by the spectral density of the data. This has the effect of reducing any frequency values in the template that are not present in the data, which if integrated over all frequencies gives the correlation of the template and itself squared.

We then perform a very similar operation with the data and template, using the conjugate of the template as we've already computed it. This causes shared frequency content between the data and template to be retained prominently, while those that aren't shared are diminished. The following division by the spectral density of data evens out regular frequencies found, resulting in spikes for each frequency proportional to the strength of those frequencies present in the template.

By integrating over all frequencies, the relative correlation of the template and data at that point is returned, proportional to the amount of the template in the data. Dividing this by the auto-correlation of the template normalises the filter, such that $$ \rho = 1 $$ is equal noise and template content, and any values above that represent a louder template signal found.

A side effect of this operation is that $$ \rho = 1 $$ is also one standard deviation of noise, as noise is Gaussian in nature, and so the value of $$ \rho $$ is identical to the standard deviation of the probability of the template occurring in the data by random noise fluctuation; that is, a template with SNR $$ 8.9 $$ has a $$ 1 - \text{erf}(\frac{8.9}{\sqrt{2}}) = 5.58467*10^{-17}\% $$ chance of being due to random noise fluctuations.

This method of matched filtering with our glitch model stands in contrast to the typical tools used, most prominently the omicron scan, as seen in figure \ref{fig:OmicronGlitches}.
Omicron scanning is agnostic to data context, quite unlike matched filtering with it's specified template searching.

Omicron scanning operates on a wavelet-like basis, whereby the entire data is whitened, and individual tiles formed from the data are overlaid on top of each-other. These tiles vary between large in frequency domain and small in time, and vice versa, and combine to give an overview of the spectral content of a segment of data. Where multiple of these tiles overlap, the data has deviated from a standard Gaussian, and the spectral shape of this event is shown <d-cite key="robinet2020omicron"></d-cite>.

It should be useful then, moving forward, to compare the results seen in omicron scans with those found by glitch matched filter searches. While they may not provide identical results, it should still pose as a secondary affirmation of found events.

<!-- python?

-hugely extensible -> see PyCBC <d-cite key="PyCBC"></d-cite> + other modules

-numpy = speedy

-(probably not quite as fast as native C, but I don't know enough C to implement everything)-->

***

## Methodology

### The Search

Now that we have a model to generate glitch events, and a handle of the methods that we can use to search for them, we can combine the two into a set of python scripts to perform a full search.

#### Data collection

To first begin, the data to perform a search on needed to be obtained. Initial testing when developing the code function used an hour long segment at GPS time 1244473218 (2019-06-13, 15:00), while the full search documented in the results used a 3 hour long segment starting at GPS time 1242442818 (2019-05-21, 03:00).

Data was collected from both Hanford and Livingston detectors, though could easily be extended to include Virgo and others. To ease computational time, the data was down-sampled from its native $$ 16384Hz $$ sampling time to $$ 4096 Hz $$. This data was then separated into smaller chunks of length $$ 512 s $$ with $$ 32 s $$ padding either side. As the matched filter requires the template and data to be of equal length, this was a happy medium between reducing the number of matched filters that needed to be computed, and reducing the length of the templates (and subsequently their memory usage). To complete the requirements for the matched filter function, the spectral density for each chunk of data was computed, as shown in figure \ref{fig:SpectralDensity}.

\begin{figure}[ht!]
    \includegraphics[width=\textwidth]{Images/SpectralDensity.png}
    \caption{Logarithmic plot of the Spectral density of the two detectors. Note the different characteristic frequencies that occur between the two.}
    \label{fig:SpectralDensity}
\end{figure}

#### Template Generation

Following this, an entire bank of template glitches and mergers needed to be created. While these can be as numerous as desired, the results in this paper were collected by creating equal-mass templates between $$ 20 M_\odot $$ and $$ 300 M_\odot $$ in $$ 10 M_\odot $$ intervals, for a total of 58. While higher mass templates, and a greater mass resolution between them, could have been used, this made for an appropriate middle ground between computational speed and breadth of search. Each of the templates created had a length of $$ 576 s $$ ($$ 512s + 32 s $$ padding either side) and a sampling rate of $$ 4096 Hz $$ to match each data chunk.

It was imperative that the length of each template was specified before performing a cyclic time shift operation. This operation was used to align the peak of each template with $$ t = 0 $$ by wrapping the entire template around its time length. If additional time was appended after this, the wrapped template would be discontinuous at $$ t = 0 $$, causing filtering errors, as the matched filter process assumes that all data and templates are continuous. This has the effect of a secondary detection echo occurring when computing the SNR, as the wrapped data is partway through the template, rather than neatly at the end of each template. An example of this artefact is shown here in figure \ref{fig:ringing}, where a secondary peak is detected after a time proportional to the duration of the initial template.

\begin{figure}[ht!]
    \includegraphics[width=\textwidth]{Images/TemplateSNRSRinging.png}
    \caption{Secondary SNR echo due to incorrect template shifting and resizing. The secondary detection peaks can be seen to occur after the primary.}
    \label{fig:ringing}
\end{figure}

#### Signal Processing

For each $$ 576 s $$ chunk of data, the Signal-to-Noise ratio was computed for each of the template events. As this would have taken a long time to do in series a multiprocessing pool <d-cite key="MultiPool"></d-cite> was utilised instead, with each of the 8 workers given a template at a time. While more workers could have been used, this would have slightly increased the overhead per worker, and would have consumed more resources on the shared server.

With $$ 928 $$ SNR segments of length $$ 576 s $$ found, all of the points where the SNR dropped below a signal threshold were discarded, so that only significant peaks remained. A typical SNR of 8 is chosen for LIGO searches, but as the standard deviation for Gaussian noise is $$ \pm 1 $$, an event that would have had a raw SNR of $$ 8 $$ could feasibly register as $$ 7 $$ with noise included, hence SNR $$ 7 $$ was the cutoff for this search.

For each of the peaks found for a given template, all peaks within a certain time threshold were compared, such that only the loudest within a $$ 5 s $$ boundary was reported. This eliminates echoing artefacts, and is significantly under the expected detection time of a gravitational event. Once each of the most significant peaks for each of the templates is found, they are compiled into an extended array, and our signal processing stages are complete.

### Compiling results

#### Event Detection

With an array of each SNR peaks found within the data, compiling them into a coherent list of probable events is the next, and arguably most important, step. To ensure computational efficiency from this point onward, the peak array is sorted chronologically. This makes the task of determining which templates align much simpler, as any two neighbours greater than $$ 5 s $$ apart mark the boundary between one event and the next.

It should be ensured between these two steps that events are sorted when other parts of the search expect them to be, as this could (and did) cause cascading errors in follow up calculations.

By splitting this array into sub-arrays, each containing only coincident SNR peak events (those that occur within a $$ 5 s $$ boundary of each other), we can directly compare each template to identify which was responsible for this event. The simplest approach is to assume that the template with the loudest SNR is most likely responsible for this event.

As we have only the coincident templates for each event, we can also show which detector data was triggered for this event. This, coupled with identifying a glitch or merger as the most probable culprit, provides an important step in quickly determining which, if any, event requires further study.

While not directly required, a very useful metric to calculate and show at this stage is $$ G/M $$ ratio, or the SNR of the loudest glitch for this event divided by the SNR of the loudest merger. This serves as a very quick indication of how "glitchy" an event actually is, with values close to $$ 1 $$ representing a possibility that random noise could have pushed this event one way or the other. Alongside this, $$ G-M $$ offset, or the time delay between the peak of the loudest glitch and loudest merger, can also be shown, though this is less important for collecting results.

For example, supposing that a $$ 20 $$ glitch and $$ 130 $$ merger had an SNR of $$ 14.5 $$ and $$ 10 $$ respectively, separated by $$ 0.5 s $$. This would be identified as a single $$ 20 M_\odot $$ glitch, with a $$ G/M $$ ratio of $$ 1.45 $$. As these individual peaks are separated by more than $$ \pm 1 $$, we can be reasonably confident in saying this event is a glitch.

Once the above steps have all been completed, it remains only to distribute them across a table, as shown in both extended and summary tables. Then, with all events categorised and laid out logically, any anomalies or objects of further study can be identified.

#### Graphical Output

While the search is technically complete, as the table of results contains any information needed, it does not necessarily aid an understanding of the distribution of events. To that end, every template peak would then be plotted on a graph, with colour representing detector, and shape showing glitch or merger, as shown in the results figure \ref{fig:SummaryResultsGraph}.

This graph would thus make coincident template defections obvious, and would also show the approximate glitch frequency in an easy to understand format.


<!--%What was done

%-compare all peaks to determine which template is probably responsible for each event

%-if necessary, look into a suspicious event ("merger" found in both detectors, for example)


%enough detail to recreate the results


%discuss random / systematic errors (coding bugs!)

%-not executing parts of the script

%-improperly generating templates

% -cyclic time-shift before resizing

% -not time-shifting

% -not resizing

%-programming the search wrong

% -accidentally returning the index adjacent to a peak, instead of the peak index

% -accidentally providing the SNR of one template as the SNR of another

% -not programming for edge cases. (just because i know exactly how my code functions, doesn't mean I always use it correctly)-->

***

## Results

For the bulk of this section, we will be referring to the table of results returned by the search script that can be found at the end of this document, with exception given to a zoomed in figure comparison below. Secondarily, all quoted SNR's (in table or otherwise) have an implicit error of $$ \pm 1 $$ due to Gaussian noise while error in reported time is assumed to be $$ \pm \frac{1}{4096} s $$ due to the sampling time. Calculations using these values also have these implicit errors built in. Finally, the results and search script can be found in this project's Github Repo <d-cite key="GithubRepo"></d-cite>.

\begin{figure}[h!]
    \includegraphics[width=\textwidth, center]{Images/190521-1hr-GravPlotSummary.png}
    \includegraphics[width=.49\textwidth]{Images/L1-LOCKED_HOFT_OMICRON_TRIGGERS-1242442818-3600.png}
    \includegraphics[width=.49\textwidth]{Images/H1-LOCKED_HOFT_OMICRON_TRIGGERS-1242442818-3600.png}
    \caption{Comparison for one hour of data of Search script output and LIGO omicron scan}
    \label{fig:omicroncomparison}
\end{figure}

As demonstrated in the theoretical segment of this paper, the glitch model looks very similar to known glitches, providing a strong incentive that this model would be effective. We also see a clear correlation of these events with those found by the omicron scan, with a few exceptions whose peak frequency was in the kilohertz regime, as seen in figure \ref{fig:omicroncomparison}. This is mostly due to our focus on IMBH mergers, whose frequency content lies in the single to tens of Hertz regime.

As listed in our [summarised table of results](https://github.com/SK1Y101/GWProject/blob/main/190521-3hr-Sumarrised_Results.tex), we found 61 unique events, of which 59 were initially labelled as glitches. The first event, GW190521, was correctly identified as a merger, despite using only a few non-specific merger templates as a control for the search. This demonstrates that, while our glitch model is similar to the glitches identified in LIGO, it does not trigger falsely for real mergers.

The second of the two events (event 13) that triggered as a merger took place at 03:38:07, 36 minutes after GW190521, was identified as a $$ 100 M_\odot $$ - $$ 100 M_\odot $$ merger. While it would be incredibly unlikely to have identified the second ever IMBH merger in history within such a short time of the first, it still warranted a further investigation as part of the search pipeline. This event was triggered only in the L1 data, and with a $$ G/M $$ ratio of $$ 0.955 $$ and peak SNR of $$ 9.57 \pm 1 $$, hence within the range that Gaussian noise can affect. To that end, it is easily explained as a misidentified glitch in a noisy segment of data.

Event 50 also stood out as an event of interest in our table. This event was identified as a glitch, with peak SNR $$ 2212.58 \pm 1 $$ and $$ G/M $$ $$ 1.142 $$ (and thus well outside the range of Gaussian noise). This would have been nothing of note, if not for the detection trigger in both the L1 and H1 data. By noting its position on the [full table of results](https://github.com/SK1Y101/GWProject/blob/main/190521-3hr-Full_Results.tex) (row 2206), we can see that this event has two main parts, one that occurred in Hanford at 05:03:51 with SNR $$ \approx2200 $$, and one in Livingston at 05:03:53 with SNR $$ \approx 7.4 $$. As the disparity between detector SNR was so high, this event is clearly a rare near-coincidental set of two glitches, and reducing the time threshold in the search from $$ 5 s $$ to $$ 2s $$ would have avoided this issue.

With the results obtained, it seems likely that this glitch model is accurate, despite this report only being a pilot study. With a higher mass resolution and larger bank of glitches (as mentioned previously) a much more refined glitch search could be carried out. A logical secondary step after this would be a search for glitches using this model, removal of those identified glitches, and then a secondary search afterwards on the cleaned data, with a much higher confidence that an event found after is a real merger.

***

## Conclusion

In conclusion, it has been demonstrated that a glitch model is not only possible, but surprisingly effective. With this, while we may not currently be able to explain what causes glitches, we can definitely model and filter them. Similar to our initial understanding of gravity, we understand how it looks, but not yet what causes it.

Without actively trying to ensure its safety, the glitch model did not misidentify GW190521, only identifying known glitches as glitches. While one glitch was misidentified as a merger, it seems far more useful to generate an occasional false positive, than false negative.

While no additional IMBH mergers have been identified in the limited scope of this paper, it would require only computational time and very minimal effort to extend the search over (potentially) the entirety of the O3 run and beyond, which should provide a definitive answer to the question as to IMBH mergers.

Following this, a larger suite of glitched templates with varying properties could be created and searched for as part of the main LIGO search pipeline. While such a model can be extended to even higher masses, it should be noted that, from figure \ref{fig:6}, we can see that glitches generated via this model and real mergers rapidly converge. By performing a quick calculation, we can note that an $$ \epsilon = 0.95 $$ reached for symmetric masses over $$ 800 M_\odot $$.
