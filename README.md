  This is a sample application developed just to show some sample pure JavaScript code done my me.

  The best source codes that I have coded and proud of are part of official projects.
  In my whole career I have been working with organisations which has strict information security policy.
  Therefore I cannot share those source code or portfolio that I am most proud of :(

  What I have developed outside of work are mainly customisation of components in frameworks like ExtJS.
  I think that those small component customisations are not good enough to demonstrate my skill in pure javascript.
  That is why I have created this sample application.

  Kindly note that this is something I have developed during extremely short free times.
  And the time I have spend to code this is not the most quality or productive time.
  More professional and quality code can be expected in an official project that I work.


What is the concept and purpose behind this demo app?

  All most all business goes online and most of them wish to reward their loyal customers.
  So,I just thought of coding a sample app around the concept of reward points; particularly for gaming websites.
  Please note that I have just added logic to add and redeem reward points.
  Then main purpose was not to add lots of features but to design a sample system purely in JavaScript.


What are the tools used to develop this?

   WebStorm,
   Firebug,
   git

How to run the application?

  1.Open testPage.html in a browser.
  2.Open browser console.
  3.Refresh the page and see the control flow and output of basic operations logged in the console.
  4.Make changes in 'test.js' or 'testDataSourceGroup.js' to run the app with different inputs.

How does control flows in application?

  A function in 'test.js' calls 'initApp' in 'app.js' to initialise the application.
  The  'initApp' triggers creation of data access object defined in 'dataSourceManager.js' and rewards processor
  defined in 'rewardsManager.js'. 'initApp' sets application ready status flag to true if initialisation of both
  data access object and rewards processor are successful. Function in 'test.js' creates players by calling
  'createUsers' function defined in 'User.js' and then loads additional details to created user objects.
  Then it performs some rewards points addition and redemption for the user object.
  That's it :)














