# Yet Another Browser Mud

This is a playful text-based online social chat space. You can think of it as a hybrid between communication apps like Slack and Discord and traditional text-based online game spaces such as MUDs and MOOs.

It is primarily being built for [Roguelike Celebration 2020](https://roguelike.club), but can hopefully eventually be repurposed for other events or communities.

On the backend, it's powered by a serverless system made up of Azure Functions, Azure SignalR Service, and a Redis instance (currently provided by Azure Cache for Redis).

On the frontend, it's a rich single-page webapp built in TypeScript and React, using the Flux architecture via the `useContext` React hook.

## Setting up a development environment

### Frontend Dev

1. Clone this repo

2. Run `npm install`

3. `npm run dev` will start a local development environment (at `http://localhost:1234/index.html` by default). It auto-watches changes to HTML, CSS, and JS/TS code, and attempts to live-reload any connected browser instances.

4. `npm run build` will generate a bundled version of the webapp for distribution. If you're planning to push changes back to this repo for use in its official deployment, don't worry about this; a GitHub Actions CI pipeline builds and deploys the main branch on every push.

### Backend Dev

After cloning this repo, the `server` directory contains all of the backend code. You may want to run `npm install` within the `server` directory to pull in dependencies for IDE autocompletion and such. 

However, you cannot actually run the backend locally. You'll need to deploy your own server instance of the backend to test changes.

If you have changes to push up to a server backend, there are three recommended ways to make a code deploy:

### GitHub Actions

TODO

### VS Code

TODO

### CLI

TODO

## Deploying This Project
Currently, this project only runs on Azure. This requires your own [Azure subscription](https://azure.com/free/?WT.mc_id=devto-blog-emwalker). 

If you don't already have an Azure account/subscription, you'll get a few hundred bucks of credits to use your first month, but if that's not the case you will want to keep an eye on the fact that **running this backend will cost you actual money**. 

### Deploying via ARM Template

![Button here]()

The easiest way to deploy a backend is to use the template we have prepared. Going to [this link](TODO) will deploy a fully-functioning instance of the latest code in this repo to an Azure resource group you specify. From there, you can deploy your own custom fork of the backend however you would like (see instructions above).

There are still a few things you need to manually configure:

1. TODO: Auth setup?
2. You'll need to modify the frontend to actually use your new backend! In `src/config.ts`, update the hostname to point to your own Function App instance (the Azure URL for your backend you've just deployed).

If you're interested in viewing the raw ARM template yourself, it's available [here](TODO).

### Costs and Scaling

For development purposes, you can use the free tier of both SignalR Service and Azure functions, you just need to pay for a small Redis instance (~$15/month).

To get this ready for production use, all you need to do is scale up your SignalR Service usage tier. Running this project with a single SignalR unit (good for up to 1,000 concurrent users) will cost you roughly $2.50 per day, with each additional SignalR unit (another 1,000 concurrents) adding roughly an additional $1.50 per day. These numbers are all rough ballpark figures.

This is the only thing you will need to manually scale. Azure Functions charges you based on usage, and it's extremely unlikely you'll need to scale up Redis unless you have tens of thousands of concurrent users. At Roguelike Celebration, with an average of around 300 concurrent users, we never hit more than a few hundred kilobytes of Redis data or used even 1% of our processing power.

### Manual Deployment Instructions

If you would prefer to not use the ARM template above, here is how you can manually configure a set of Azure resources to run this project.

1. Deploy the `server` folder to a new Azure Function App instance you control. I recommend using VS Code and the VS Code Azure Functions extension. See the "Publish the project to Azure" section of [this tutorial](https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-function-vs-code?pivots=programming-language-javascript?WT.mc_id=github-code-emwalker) for details. You can also use the Azure CLI or any other method.

2) In the Azure Portal, sign up for a new [Azure SignalR Service](https://docs.microsoft.com/en-us/azure/azure-signalr/signalr-overview?WT.mc_id=github-code-emwalker) instance. For development purposes, you can probably start with the free tier.

3) Grab the connection string from your Azure SignalR Service instance. Back in the settings for your Function App, go to the Configuration tab and add a Application Setting with the key `AzureSignalRConnectionString`

4) Set up an [Azure Cache for Redis](https://docs.microsoft.com/en-us/azure/azure-cache-for-redis/cache-overview?WT.mc_id=github-code-emwalker) instance. Again, the cheapest tier is likely acceptable for testing purposes. You could theoretically use an alternative Redis provider, as nothing about our use is Azure-specific, but I have not tried this.

5) As above, you want to take your Redis access key, the hostname, and the port, and add them as Application settings to the Function App with the keys `RedisKey` and `RedisHostname`, `RedisPort`.

6) Set up Twitter authentication. In the Azure Portal, pull up the Function App and go to "Authentication". In another window, go to <https://developer.twitter.com/apps> and register a new Twitter developer application. You will need to paste the consumer key and secret from Twitter into the Azure setup screen for Twitter. The callback URL to enter in the Twitter app is `https://your-function-app.azurewebsites.net/.auth/login/twitter/callback`, swapping in the URL hostname of your Function app. In the Azure Portal authentication screen, make sure that "Token Store" is on, and add "http://localhost:1234" (and any other URLs you want to be able to use) to the Allowed External Redirect URLs list.

7) Set up CORS in the Azure Portal page for the Function app. There's a "CORS" menu item on the left. Allow `http://localhost:1234` for local development, as well as whatever URLs you're using for a production version of the frontend.

8) In `src/config.ts` in this repo, update the hostname to point to your own Function App instance (the Azure URL for your backend, NOT wherever you're hosting the app's frontend).

## Editing the map
The ASCII map was created with [MonoDraw](https://monodraw.helftone.com), a Mac-only ASCII art tool. You'll want to open the `map.monopic` file in that, export your changes, paste the ASCII string into `src/components/MapView.tsx`, and then update any changes to the two datasets of persistence identifiers and clickable areas. Note that the coordinates listed in the MonoDraw view are 1-indexed, whereas the app itself expects 0-indexed coordinates.

## Contributions

If you're looking to get involved: awesome! There's a "Good First Issue" tag in this repo's GitHub Issues that may point you towards something. If you want to work on something, it might be nice to comment that you're looking into it in case others are already working on it or were thinking about it.

Fork this repo, make your changes, open a pull request! Once you've contributed, I'm fairly liberal with granting people contributor access, but the `main` branch is still locked.

Pull requests are run through a few automated checks. If the `ESLint` checks fail, first try running `npm run eslint-fix` to try to automatically fix as many of the errors as you can; anything that doesn't catch will need to be fixed manually.
