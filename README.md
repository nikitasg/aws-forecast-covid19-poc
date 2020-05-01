## Amazon Forecast

This goal of this repository is to provide a common starting point for using AWS Forecast and automate the deployment processs



In the Notebooks you will learn to:

1. Prepare a dataset for use with Amazon Forecast.
1. Build models based on that dataset.
1. Evaluate a model's performance based on real observations.
1. How to evaluate the value of a Forecast compared to another.

## Agenda

The steps below outline the process of building your own time-series prediction models, evaluating them, and then cleaning up all of yuour resources to prevent any unwanted charges. To get started execute the following steps.

1. Deploy the CloudFormation Template below or build a local Jupyter environment with the AWS CLI installed and configured for your IAM account.
1. [1.Getting_Started.ipynb](notebooks/basic/Tutorial/1.Getting_Started.ipynb) - Guides you through preparing your dataset to be used with Amazon Forecast.
1. [2.Building_the_Predictor.ipynb](notebooks/basic/Tutorial/2.Building_the_Predictor.ipynb) - Explains how to use the dataset you prepared to build your first model.
1. [3.Evaluating_the_Predictor.ipynb](notebooks/basic/Tutorial/3.Evaluating_the_Predictor.ipynb) - Takes the model you just created and evaluates its performance against real observed measurements.
1. [4.Cleanup.ipynb](notebooks/basic/Tutorial/4.Cleanup.ipynb) - Deletes Amazon Forecast resources and IAM role created in above notebooks.

Each notebook can be found within the `notebooks` folder in this project.

[Covid-19 Datasets Worldwide](https://github.com/nikitasg/covid19-data)

# Coronavirus datasets UK

![Grab latest data](https://github.com/nikitasg/aws-forecast-covid19-poc/workflows/Grab%20latest%20data/badge.svg?event=schedule)

This is a mirror of the data presented on the [PHE Coronavirus Dashboard](https://coronavirus.data.gov.uk/).

The data behind the dashboard is not easy to query, although it is obtainable by looking at [the dashboard codebase](https://github.com/PublicHealthEngland/coronavirus-dashboard).

This repository holds the raw JSON data and versions of the CSV files that are downloadable via javascript from the dashboard app.

The files in the data directory are:

* [`data.json`](./data/data.json) - latest data using the procedure defined by the PHE app
* `coronavirus-cases.csv` - cases data in the PHE format
* `coronavirus-deaths.csv` - deaths data in the PHE format
* `metadata.json` - metadata - currently only the timestamp the build was run

WARNING - the data from PHE is not clearly licensed. I assume that it is licensed under the [Open Government License](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/)

## Prerequisites 

1. An AWS Account
2. A user in the account with administrative privileges
3. Covid Datasets


## Outline

1. First you will deploy a CloudFormation template that will create an S3 bucket for data storage, a SageMaker Notebook Instance where the exercises are executed, IAM policies for the Notebook Instance, and it will clone this repository into the Notebook Instance so you are ready to get started.
1. Next you will open the `Getting_started.ipynb` to get started.
1. This notebook will guide you through the process of the other notebooks until you have a working and evaluated forecast.


## Building Your Environment:

As mentioned above, the first step is to deploy a CloudFormation template that will perform much of the initial setup work for you. In another browser window or tab, login to your AWS account. Once you have done that, open the link below in a new tab to start the process of deploying the items you need via CloudFormation.

[![Launch Stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)](https://console.aws.amazon.com/cloudformation/home#/stacks/new?stackName=ForecastDemo&templateURL=https://awsforecastdemo.s3-eu-west-1.amazonaws.com/ForecastDemo.yaml)

Follow along with the screenshots below if you have any questions about deploying the stack.

### Cloud Formation Wizard


 
