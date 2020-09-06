# Guided-learning-solution
This GLS (guided learning solution) program guides a new user through google.com.
 The guide displayes tooltips to help guide the user through the website.

## JSNOP file
Firstly, I requested the JSONP file that contains the information about the guide.
Once receiving the JSNOP, it is required to find the information needed to make tooltips for the google.com guide.
The next step is to parse the information for the guide and collect the information needed for the tooltips.
The information that was taken from the JSONP file:
id, type, selector, placement, content, templates (data field) and style for the tips (css field).

## Creating tooltips
I added the style and template tags to the html for the future tips.
Then I found the elements on the google.com html file and added the correct templates that were given in the JSONP file and added the content that will be displayed on the tooltip.
The next step would adding event listeners on the buttons of the tooltips and creating a flow in the guide.
The 'next' button would lead to the next tip, 'previous' button would go back to the previous tooltip (if possible).

