import time as t
import pandas as pd
import self as self
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains
import urllib
from bs4 import BeautifulSoup as BS

#this code only works for AB

def scroll_down(driver):
    lenOfPage = browser.execute_script("window.scrollTo(0, document.body.scrollHeight);var lenOfPage=document.body.scrollHeight;return lenOfPage;")
    match=False
    while(match==False):
        lastCount = lenOfPage
        t.sleep(20)
        lenOfPage = driver.execute_script("window.scrollTo(0, document.body.scrollHeight);var lenOfPage=document.body.scrollHeight;return lenOfPage;")
        if lastCount==lenOfPage:
            match=True

def ParseProdList(prlist):
    for i in prlist:
        #print(i.get_attribute('innerHTML'))
        global product
        global new


        new['name'] = i.find_element_by_class_name("y4jrw3-10.blXRoq").text

        if not i.find_elements_by_class_name("sc-1qeaiy2-2.ffeegE"):
            new['ppu'] = 'OOS'
        else:
            new['ppu'] = i.find_element_by_class_name("sc-1qeaiy2-2.ffeegE").text
            new['image'] = i.find_element_by_class_name("y4jrw3-7.eukSKK")

        if not i.find_elements_by_class_name("sc-1qeaiy2-3.eMqbjC"):
            new['supp'] = 'NA'
        else:
            new['supp'] = i.find_element_by_class_name("sc-1qeaiy2-3.eMqbjC").text




        product = product.append(new, ignore_index=True)

    # print(product)


product = pd.DataFrame({},index=[0])
product['name'] = ''
product['ppu'] = '' #price per unit
product['supp'] = '' # supplementary price
product['image'] = ''
new = product

browser = webdriver.Firefox(executable_path=r'K:\Thesis\geckodriver')
browser.get('https://www.ab.gr/eshop')

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[2]/div/div/div/div/div[3]/div/div[1]/button/div") #ακυρωση cookies
ActionChains(browser).click(element).perform()

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/a")
ActionChains(browser).click(element).perform()
t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/div[2]/div/div[1]/div[2]/div[1]/a/div[2]") #οπωροπολειο
ActionChains(browser).click(element).perform()

# scroll_down(browser)
# prodlist = browser.find_elements_by_class_name("y4jrw3-8.HWgTZ")
prodlist = browser.find_elements_by_class_name("y4jrw3-0.jTLlSv")
ParseProdList(prodlist)
#
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/a")
# ActionChains(browser).click(element).perform()
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/div[2]/div/div[1]/div[2]/div[2]/a/div[2]") #γαλα
# ActionChains(browser).click(element).perform()
#
# scroll_down(browser)
# prodlist = browser.find_elements_by_class_name("product-item")
# ParseProdList(prodlist)
#
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/a")
# ActionChains(browser).click(element).perform()
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/div[2]/div/div[1]/div[2]/div[3]/a/div[2]") #κρεας
# ActionChains(browser).click(element).perform()
#
# scroll_down(browser)
# prodlist = browser.find_elements_by_class_name("y4jrw3-8.HWgTZ")
# ParseProdList(prodlist)
#
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/a")
# ActionChains(browser).click(element).perform()
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/div[2]/div/div[1]/div[2]/div[4]/a/div[2]") #τυρια
# ActionChains(browser).click(element).perform()
#
# scroll_down(browser)
# prodlist = browser.find_elements_by_class_name("y4jrw3-8.HWgTZ")
# ParseProdList(prodlist)
#
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/a")
# ActionChains(browser).click(element).perform()
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/div[2]/div/div[1]/div[2]/div[5]/a/div[2]") #πρωινο
# ActionChains(browser).click(element).perform()
#
# scroll_down(browser)
# prodlist = browser.find_elements_by_class_name("y4jrw3-8.HWgTZ")
# ParseProdList(prodlist)
#
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/a")
# ActionChains(browser).click(element).perform()
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/div[2]/div/div[1]/div[2]/div[6]/a/div[2]") #βασικα
# ActionChains(browser).click(element).perform()
#
# scroll_down(browser)
# prodlist = browser.find_elements_by_class_name("y4jrw3-8.HWgTZ")
# ParseProdList(prodlist)
#
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/a")
# ActionChains(browser).click(element).perform()
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/div[2]/div/div[1]/div[2]/div[7]/a/div[2]") #κατεψυγμενα
# ActionChains(browser).click(element).perform()
#
# scroll_down(browser)
# prodlist = browser.find_elements_by_class_name("y4jrw3-8.HWgTZ")
# ParseProdList(prodlist)
#
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/a")
# ActionChains(browser).click(element).perform()
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/div[2]/div/div[1]/div[2]/div[8]/a/div[2]") #αρτος
# ActionChains(browser).click(element).perform()
#
# scroll_down(browser)
# prodlist = browser.find_elements_by_class_name("y4jrw3-8.HWgTZ")
# ParseProdList(prodlist)
#
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/a")
# ActionChains(browser).click(element).perform()
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/div[2]/div/div[1]/div[2]/div[9]/a/div[2]") #κρασια
# ActionChains(browser).click(element).perform()
#
# scroll_down(browser)
# prodlist = browser.find_elements_by_class_name("y4jrw3-8.HWgTZ")
# ParseProdList(prodlist)
#
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/a")
# ActionChains(browser).click(element).perform()
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/div[2]/div/div[1]/div[2]/div[10]/a/div[2]") #ετοιμα
# ActionChains(browser).click(element).perform()
#
# scroll_down(browser)
# prodlist = browser.find_elements_by_class_name("y4jrw3-8.HWgTZ")
# ParseProdList(prodlist)
#
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/a")
# ActionChains(browser).click(element).perform()
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/div[2]/div/div[1]/div[2]/div[11]/a/div[2]") #προσωπικης
# ActionChains(browser).click(element).perform()
#
# scroll_down(browser)
# prodlist = browser.find_elements_by_class_name("y4jrw3-8.HWgTZ")
# ParseProdList(prodlist)
#
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/a")
# ActionChains(browser).click(element).perform()
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/div[2]/div/div[1]/div[2]/div[12]/a/div[2]") #καθαριστικα
# ActionChains(browser).click(element).perform()
#
# scroll_down(browser)
# prodlist = browser.find_elements_by_class_name("y4jrw3-8.HWgTZ")
# ParseProdList(prodlist)
#
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/a")
# ActionChains(browser).click(element).perform()
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/div[2]/div/div[1]/div[2]/div[13]/a/div[2]") #κατοικιδια
# ActionChains(browser).click(element).perform()
#
# scroll_down(browser)
# prodlist = browser.find_elements_by_class_name("y4jrw3-8.HWgTZ")
# ParseProdList(prodlist)
#
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/a")
# ActionChains(browser).click(element).perform()
# t.sleep(8)
# element = browser.find_element_by_xpath("/html/body/div[1]/header/div/div[4]/div[2]/div/div/div[1]/div/div[2]/div/div[1]/div[2]/div[14]/a/div[2]") #μωρο
# ActionChains(browser).click(element).perform()
#
# scroll_down(browser)
# prodlist = browser.find_elements_by_class_name("y4jrw3-8.HWgTZ")
# ParseProdList(prodlist)


product.to_excel('K:\Thesis\ABCD.xlsx')