---
layout: page
title: Curriculum vitae
permalink: /cv/
description: online view of my Curriculum vitae
nav: true
---

<div class="row" style="margin-top: -3.5em;">
	<a class="ml-auto mr-2" href="/assets/pdf/CV.pdf" target="_blank">
	  <img height="60px" src="/assets/img/pdf_icon.jpg" />
	</a>
</div>

<!-- General -->

<i class="fas fa-file-pdf"></i>

<div class="card">
	Full name: Jack Lloyd-Walters FRAS
</div>

<div class="card-body">
      <h2 class="card-title">General Information</h2>
        <div class="row ml-1 mr-1 p-0">
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
		</table>
	</div>
</div>

###