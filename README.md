## Prometheus_to_Discord

# Flow for the repo:

1. The script will create a `client` with the Prometheus using the data and script from the `config.js` and `index.js`.
2. Then it will take `input.json` as `--input`, parse its data, and use query from it. 
3. The resultant will be fed to Prometheus using the `Prometheus API`.
4. The API will result out some json.
5. The json will be parsed and the required parameters will be picked out of it. 
6. Then we will do some formatting of the output.
7. And then will use the script to feed the formatted result to the discord.

To run the repo you need to 

# 1. Configure the settings in `index.js` and `config.js` file for folowing variables:

 **_url_ - discord bot webhook inside the `index.js`** 
 
 **_username_ - name of the channel inside the `index.js`**
 
 **_PrometheusAPI_ inside the `config.js`**  
 
 **_SlackToken_ inside the `config.js`**  
 
 **_SlackChannelID_ inside the `config.js`**
 
 **Add host information inside the `input.json`**


****NOTE:****

For sending the report to the slack you need to uncomment the code in the `_index.js_` file from line 47 - 51.

Also, to run the repo you need to configure the settings in config.js file for folowing variables: 

**SlackToken**

**SlackChannelID**

 

# 2. Use the command to run the script:
 
```bash
 node index.js --input input-new.json --days 1
 ```
 
