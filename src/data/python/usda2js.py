###########################################################################
#
# USDA Food Database Parser for JavaScript
#
# Author: Kent McKinney
# Created: 1/19/2020
# Modified: 1/20/2020
#
# Parses the USDA food nutrient database files
# Creates a tailored set of data for use in JavaScript applications
#
# Requires: Python 3
#
# https://github.com/kentpmckinney/project-usda-food-database-parser
#
###########################################################################

import csv
import os
import sys
import datetime
import re
import json

optionFileInventoryCheck = True

# region Pre-Parse
###########################################################################

srcPath = os.path.abspath("../src/") + '/'
dstPath = os.path.abspath("../dst/") + '/'

print("\nUSDA Food Database Parser for JavaScript v1.0")
print("Source Path: " + srcPath)
print("Destination Path: " + dstPath)
print("Start: " + str(datetime.datetime.now()))

# Calculate the combined size of original set of data files
size = 0
for filename in os.listdir(srcPath):
    if filename.endswith(".csv"):
        size += os.path.getsize(srcPath + filename)/1000/1000

print("Source USDA data file size: " + str(size) + " MB")
print("Loading source data files...")

# File inventory check
if optionFileInventoryCheck == True:
    TODO = True

# Read and sort data from nutrient.csv (list of nutrients)
with open(srcPath + "nutrient.csv", "r") as srcNutrientList:
    null = srcNutrientList.readline()  # discard header
    nutrientListReader = csv.reader(
        srcNutrientList.read().splitlines(), delimiter=',', quotechar='"')
    nutrientList = sorted(nutrientListReader,
                          key=lambda row: row[1], reverse=False)
    del nutrientListReader

# Read and sort data from food.csv (list of foods)
with open(srcPath + "food.csv", "r") as srcFoods:
    null = srcFoods.readline()  # discard header
    foodReader = csv.reader(srcFoods.read().splitlines(),
                            delimiter=',', quotechar='"')
    foodList = sorted(foodReader, key=lambda row: row[2], reverse=False)
    del foodReader
    numFoods = sum(1 for line in foodList)

# Read and sort data from food_nutrient.csv (nutrient content of foods)
with open(srcPath + "food_nutrient.csv", "r") as srcNutrients:
    null = srcNutrients.readline()  # discard header
    foodNutrientReader = csv.reader(
        srcNutrients.read().splitlines(), delimiter=',', quotechar='"')
    foodNutrientList = sorted(
        foodNutrientReader, key=lambda row: row[1], reverse=False)
    del foodNutrientReader

# Specify which nutrients to include
include = []
include.append("1003")  # Protein
include.append("1004")  # Total lipid
include.append("1005")  # Carbohydrate
include.append("1008")  # Energy in KCAL
include.append("1051")  # Water
include.append("1063")  # Sugars, total NLEA
include.append("1079")  # Fiber, total dietary
include.append("1085")  # Fat, total NLEA
include.append("1087")  # Calcium
include.append("1089")  # Iron
include.append("1095")  # Zinc
include.append("1104")  # Vitamin A
include.append("1109")  # Vitamin E
include.append("1137")  # Boron
include.append("1167")  # Niacin
include.append("1178")  # Vitamin B-12
include.append("1257")  # Fatty acids, total trans
include.append("1258")  # Fatty acids, total saturated
include.append("1283")  # Phytosterols
include.append("1329")  # Fatty acids, mono
include.append("1330")  # Fatty acids, di
include.append("1331")  # Fatty acids, poly

header = ['fdcId']
for nutrient in nutrientList:
    name = nutrient[1]
    header.append(name)

units = ['units']
for nutrient in nutrientList:
    unit = nutrient[2]
    units.append(unit)

nutids = ['nutIds']
for nutrient in nutrientList:
    _id = nutrient[0]
    nutids.append(_id)

if len(header) != len(units):
    print("\nERROR! Discrepancy between header and units length: header=" +
          str(len(header)) + " units=" + str(len(units)))

###########################################################################
# endregion


# region Parse
###########################################################################

# Create/Open destination data file for the ingredients.json output file
ingredients = []
with open(dstPath + "ingredients.json", "w") as ingredientsFile:
    for food in foodList:
        fdcId = food[0]
        description = food[2]
        ingredients.append([description, fdcId])
    json.dump(ingredients, ingredientsFile)
del ingredients

nutdata = []
with open(dstPath + "nutrients.json", "w") as nutrientsFile:
    nutdata.append(header)
    nutdata.append(units)
    nutdata.append(nutids)
    currentFdcId = -1
    nutDataRow = [''] * len(header)
    for item in foodNutrientList:
        fdcId = item[1]
        nutId = item[2]
        amount = item[3]
        if fdcId == currentFdcId:
            nutDataRow[nutids.index(nutId)] = amount
        else:
            if nutDataRow[0] != '':
                nutdata.append(nutDataRow)
            nutDataRow = [''] * len(header)
            currentFdcId = fdcId
            nutDataRow[0] = fdcId
    json.dump(nutdata, nutrientsFile, indent=None, separators=(',', ':'))
del nutdata


# region Post-Parse
###########################################################################

print("\nEnd: " + str(datetime.datetime.now()))

# Calculate the combined size of modified set of data files
size = 0
for filename in os.listdir(dstPath):
    if filename.endswith(".json"):
        size += os.path.getsize(dstPath + filename)/1000/1000

print("Destination USDA data file size: " + str(size) + " MB\n")

###########################################################################
# endregion
