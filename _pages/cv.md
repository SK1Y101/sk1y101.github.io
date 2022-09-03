---
layout: page
title: CV
permalink: /cv/
description: Online view of my Curriculum vitae, downloadable PDF available.
nav: true
---

<div class="row" style="margin-top: -8rem; margin-bottom: 4rem">
	<a class="ml-auto mr-2" href="/assets/pdf/CV.pdf" target="_blank" style="color: var(--global-text-color) !important;">
	  <i class="fas fa-file-pdf" style="font-size: 3rem;"></i>
	</a>
</div>

<div class="cv">

	<!-- General -->

	<div class="card p-3">
		<h3 class="card-title">General</h3>
	      <table class="table table-sm table-borderless">
	          <tr>
				<td class="p-0 pr-2 text-right">
					<b>Full Name</b>
				</td>
				<td class="p-0 pl-2 text-left">
					{{ site.first_name }} {{ site.middle_name }} {{ site.last_name }}
				</td>
			</tr>
			<tr>
				<td class="p-0 pr-2 text-right">
					<b>Contact</b>
				</td>
				<td class="p-0 pl-2 text-left">
					<a href="mailto:{{ site.email | encode_email }}" title="email">{{ site.email }}</a>
				</td>
			</tr>
			<tr>
				<td class="p-0 pr-2 text-right">
					<b>Languages</b>
				</td>
				<td class="p-0 pl-2 text-left">
					English (Native), Japanese (Beginner)
				</td>
			</tr>
		</table>
	</div>

	<!-- About me -->

	<div class="card p-3">
		<h3 class="card-title">About Me</h3>
		<div class="card-text p-3">
		I’m an associate software engineer for the Metal as a Service team at Canonical, with a strong passion for computational physics, particularly focused on astronomy, exoplanetary science, and other space-based endeavours.
		<br/>
		I began programming in 2011 with Python, and have developed extensive programming experience that I used to great effect in my 2021 bachelors project ”Distinguishing Intermediate Mass Black Hole Mergers From Short Duration Glitches”, my 2022 Masters Project “Determining The Parameters of Exoplanetary Candidates From Transit Timing Variations”, and my career as software engineer.
		<br/>
		In 2020 I became a fellow of the Royal Astronomical Society and a member of the European Astronomical Society to further my interest and professional options, as I have a strong interest in astrophysics research.
		<br/>
		In February 2022 I joined the AiCore Training scheme to become an Ai & Data Engineer, to eventually pursue a career in software engineering.
		In July 2022 I graduated First class as Mphys (Hons) Physics, Astronomy, and Cosmology at Portsmouth University, which additionally granted me status as a member of the Institue of Physics.
		<br/>
		I am also a beginner learner of Japanese, having undertaken extracurricular language modules during my final year of university, with a long term goal of bilinguality.
		</div>
	</div>

	<!-- Education -->

	<div class="card p-3">
		<h3 class="card-title">Education</h3>
		<div>
			<ul class="card-text list-group list-group-flush">
				<li class="list-group-item">
					<div class="row">
						<div class="col-sm-2 abbr">
							<abbr class="badge">
								2022-02 - 2022-06
							</abbr>
						</div>
						<div class="col-xs-10 cl-sm-10 col-md mt-2 mt-md-0">
							<h3 class="title font-weight-bold ml-1 ml-md-4">AI & Data Engineering - AiCore</h3>
							<ul class="items">
								<li>
									Certified in the practical application of AI & Data Engineering using industry-standard tools including:
									<ul>
										<li>
											Software engineering (Git & GitHub, advanced Python, algorithms & data structures)
										</li>
										<li>
											Data engineering (SQL, data lakes, data warehousing, web scraping)
										</li>
										<li>
											Data science (Data cleaning, preprocessing & visualisation, A/B testing, feature engineering, statistical modelling, model selection and implementation)
										</li>
										<li>
											Cloud Engineering (cloud computing, designing and building APIs, Docker, Apache Airflow, AWS Serverless Stack)
										</li>
									</ul>
								</li>
    							<li>
									Worked on multiple industry projects throughout.
								</li>
							</ul>
						</div>
					</div>
				</li>
				<li class="list-group-item">
					<div class="row">
						<div	 class="col-sm-2 abbr">
							<abbr class="badge">
								2018 - 2022
							</abbr>
						</div>
						<div class="col-xs-10 cl-sm-10 col-md mt-2 mt-md-0">
							<h3 class="title font-weight-bold ml-1 ml-md-4">MPhys (Hons) Physics, Astronomy, and Cosmology - University of Portsmouth</h3>
							<ul class="items">
								<li>
									Level 7 Masters Project utilising Computational modelling and a combination of first hand telescopic observation and supplementary data to measure the properties of transiting exoplanets, and develop analytical models of transit timing variations to investigate the potential properties of other bodies in the system, and computational methods for recovering them. This project was summarised with a 6000 word dissertation, 10 minute presentation/discussion, and scientific poster presentation.
								</li>
								<li>
									Level 6 Bachelors Project utilising Computational modelling and signal processing to identify Glitch events within the LIGO Dataset. This project was summarised with a 5000 word dissertation, 10 minute presentation/discussion, and LaTeX Compatible result list.
								</li>
							</ul>
						</div>
					</div>
				</li>
				<li class="list-group-item">
					<div class="row">
						<div class="col-sm-2 abbr">
							<abbr class="badge">
								2016 - 2018
							</abbr>
						</div>
						<div class="col-xs-10 cl-sm-10 col-md mt-2 mt-md-0">
							<h3 class="title font-weight-bold ml-1 ml-md-4">AS Levels - Peter Symonds College</h3>
							<ul class="items">
								<li>
									Physics (A), EPQ (A), Maths (B), Further Maths (D), AS Level Only Chemistry (A)
								</li>
								<li>
									Level 3 Extended Project Qualification study on the habitability of earth like exoplanets on the prospect of extra-terrestrial life, intelligent or otherwise, particularly in and around long lived M-Dwarf stars. This project Primarily Utilised Research, critical evaluation skills, and light programming (Particularly Excel with minimal Python). This project was summarised with a 20000 word dissertation and 15 minute presentation/discussion.
								</li>
							</ul>
						</div>
					</div>
				</li>
				<li class="list-group-item">
					<div class="row">
						<div	 class="col-sm-2 abbr">
							<abbr class="badge">
								2011 - 2016
							</abbr>
						</div>
						<div class="col-xs-10 cl-sm-10 col-md mt-2 mt-md-0">
							<h3 class="title font-weight-bold ml-1 ml-md-4">GCSEs - City of Portsmouth Boys' School</h3>
							<ul class="items">
								<li>
									Grades A* to B including Maths, Science, English, and Computer Science
								</li>
							</ul>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>

	<!-- Work -->

	<div class="card p-3">
		<h3 class="card-title">Work</h3>
		<div>
			<ul class="card-text list-group list-group-flush">
				<li class="list-group-item">
					<div class="row">
						<div	 class="col-sm-2 abbr">
							<abbr class="badge">
								2022 - present
							</abbr>
						</div>
						<div class="col-xs-10 cl-sm-10 col-md mt-2 mt-md-0">
							<h3 class="title font-weight-bold ml-1 ml-md-4">Associate Software Engineer - Canonical</h3>
							<ul class="items">
								<li>
									Working as part of the <a href="https://maas.io/">Metal as a Service</a> team
								</li>
								<li>
									Applied to the Graduate Fast Track role.
								</li>
							</ul>
						</div>
					</div>
				</li>
				<li class="list-group-item">
					<div class="row">
						< 	 class="col-sm-2 abbr">
							<abbr class="badge">
								2017 - 2019
							</abbr>
						</div>
						<div class="col-xs-10 cl-sm-10 col-md mt-2 mt-md-0">
							<h3 class="title font-weight-bold ml-1 ml-md-4">Floor Staff - B&M</h3>
							<ul class="items">
								<li>
									Managed fast moving customer goods primarily, seasonal stock for the four months leading up to the new year secondarily.
								</li>
								<li>
									Managed other store areas at request, requiring up-to-date knowledge of most of stock.
								</li>
								<li>
									Dealt with stock deliveries on most days and organised offloaded pallets in the warehouse daily.
								</li>
								<li>
									Coordinated delivery requests for large customer purchases on a biweekly to monthly basis.
								</li>
							</ul>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>

	<!-- Professional Membership -->

	<div class="card p-3">
		<h3 class="card-title">Professional Membership</h3>
		<div>
			<ul class="card-text list-group list-group-flush">
				<li class="list-group-item">
					<div class="row">
						<div	 class="col-sm-2 abbr">
							<abbr class="badge">
								2022 - present
							</abbr>
						</div>
						<div class="col-xs-10 cl-sm-10 col-md mt-2 mt-md-0">
							<h3 class="title font-weight-bold ml-1 ml-md-4">Member of the Institue of Physics</h3>
							<ul class="items">
								<li>
									Allows the use of the post-nomen "MInstP".
								</li>
							</ul>
						</div>
					</div>
				</li>
				<li class="list-group-item">
					<div class="row">
						<div	 class="col-sm-2 abbr">
							<abbr class="badge">
								2020 - present
							</abbr>
						</div>
						<div class="col-xs-10 cl-sm-10 col-md mt-2 mt-md-0">
							<h3 class="title font-weight-bold ml-1 ml-md-4">Member of the European Astronomical Society</h3>
							<ul class="items">
							</ul>
						</div>
					</div>
				</li>
				<li class="list-group-item">
					<div class="row">
						<div	 class="col-sm-2 abbr">
							<abbr class="badge">
								2020 - present
							</abbr>
						</div>
						<div class="col-xs-10 cl-sm-10 col-md mt-2 mt-md-0">
							<h3 class="title font-weight-bold ml-1 ml-md-4">Fellow of the Royal Astronomical Socity</h3>
							<ul class="items">
								<li>
									Allows the use of the post-nomen "FRAS".
								</li>
							</ul>
						</div>
					</div>
				</li>
				<li class="list-group-item">
					<div class="row">
						<div	 class="col-sm-2 abbr">
							<abbr class="badge">
								2018 - 2022
							</abbr>
						</div>
						<div class="col-xs-10 cl-sm-10 col-md mt-2 mt-md-0">
							<h3 class="title font-weight-bold ml-1 ml-md-4">Associate Member of the Institue of Physics</h3>
							<ul class="items">
							</ul>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>

	<!-- Skills -->

	<div class="card p-3">
		<h3 class="card-title">Skills</h3>
	      <table class="table table-sm table-borderless">
	          <tr>
				<td class="p-0 pr-2 text-right">
					<b>Programming</b>
				</td>
				<td class="p-0 pl-2 text-left">
					Excellent knowledge of programming having began in early 2011 with Python and HTML/CSS and steadily picking up other languages as time has passed. Have gained familiarity with Unix due to using Ubuntu as the OS on my Personal Machine from early 2021 onwards, and working as a software engineer in a linux development environment.
				</td>
			</tr>
			<tr>
				<td class="p-0 pr-2 text-right">
					<b>Languages</b>
				</td>
				<td class="p-0 pl-2 text-left">
					English native speaker, with beginner Japanese that I began working on as part of a language course at university. My eventual aim is bilingual fluency, but I am currently aiming to pass the Japanese N5.
				</td>
			</tr>
			<tr>
				<td class="p-0 pr-2 text-right">
					<b>Office</b>
				</td>
				<td class="p-0 pl-2 text-left">
					Proficient with Excel, Slides, Jupyter, and Overleaf for all required office workloads, with specific skills focussing on the methods required to manipulate data, write and present research papers. While I am Proficient with Word/Publisher/Docs, I much prefer LaTeX Typesetting.
				</td>
			</tr>
		</table>
	</div>
</div>
