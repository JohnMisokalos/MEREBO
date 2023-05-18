import time as t
import pandas as pd
import self as self
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains
import urllib
from bs4 import BeautifulSoup as BS

#this code only works for sklab

def scroll_down(driver):
    lenOfPage = browser.execute_script("window.scrollTo(0, document.body.scrollHeight);var lenOfPage=document.body.scrollHeight;return lenOfPage;")
    match=False
    while(match==False):
        lastCount = lenOfPage
        t.sleep(10)
        lenOfPage = driver.execute_script("window.scrollTo(0, document.body.scrollHeight);var lenOfPage=document.body.scrollHeight;return lenOfPage;")
        if lastCount==lenOfPage:
            match=True

def ParseProdList(prlist, category_name):
    for i in prlist:
        #print(i.get_attribute('innerHTML'))
        global product
        global new

        new['category'] = category_name
        new['name'] = i.find_element_by_class_name("product__title").text

        if not i.find_elements_by_class_name("price"):
            new['ppu'] = 'OOS'
        else:
            new['ppu'] = i.find_element_by_class_name("price").text

        if not i.find_elements_by_class_name("priceKil"):
            new['supp'] = 'NA'
        else:
            new['supp'] = i.find_element_by_class_name("priceKil").text

        product = product.append(new, ignore_index=True)
    print(product)

def browse_categories(num_cat, id):
    for i in range(1, num_cat+1):
        print(i)
        element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[" + str(id) + "]/ul/li[" + str(i) + "]/a")
        category_name = element.text
        ActionChains(browser).click(element).perform()

        t.sleep(5)

        scroll_down(browser)
        prodlist = browser.find_elements_by_class_name("product")
        # print(prodlist)
        ParseProdList(prodlist, category_name)

product = pd.DataFrame({},index=[0])
product['category'] = ''
product['brand'] = ''
product['name'] = ''
product['ppu'] = '' #price per unit
product['supp'] = '' # supplementary price
new = product

browser = webdriver.Firefox(executable_path=r'K:\Thesis\geckodriver')
browser.get('https://www.sklavenitis.gr/')

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[3]/div[1]/div[2]/button[3]") # cookies
ActionChains(browser).click(element).perform()

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/header/div[2]/div/nav/ul[1]/li[2]/a")
ActionChains(browser).click(element).perform()


t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[1]/span/span")
ActionChains(browser).click(element).perform()
browse_categories(7, 1)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[2]/span/span")
ActionChains(browser).click(element).perform()
browse_categories(3, 2)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[3]/span/span")
ActionChains(browser).click(element).perform()
browse_categories(3, 3)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[4]/span/span")
ActionChains(browser).click(element).perform()
browse_categories(5, 4)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[5]/span/span")
ActionChains(browser).click(element).perform()
browse_categories(4, 5)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[6]/span/span")
ActionChains(browser).click(element).perform()
browse_categories(6, 6)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[7]/span/span")
ActionChains(browser).click(element).perform()
browse_categories(6, 7)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[8]/span/span")
ActionChains(browser).click(element).perform()
browse_categories(6, 8)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[9]/span/span")
ActionChains(browser).click(element).perform()
browse_categories(8, 9)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[10]/span/span")
ActionChains(browser).click(element).perform()
browse_categories(8, 10)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[11]/span/span")
ActionChains(browser).click(element).perform()
browse_categories(7, 11)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[12]/span/span")
ActionChains(browser).click(element).perform()
browse_categories(7, 12)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[14]/span/span")
ActionChains(browser).click(element).perform()
browse_categories(3, 14)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[15]/span/span")
ActionChains(browser).click(element).perform()
browse_categories(3, 15)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[16]/span/span")
ActionChains(browser).click(element).perform()
browse_categories(2, 16)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[17]/span/span")
ActionChains(browser).click(element).perform()
browse_categories(4, 17)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[18]/span/span")
ActionChains(browser).click(element).perform()
browse_categories(5, 18)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[19]/span/span")
ActionChains(browser).click(element).perform()
browse_categories(5, 19)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[20]/span/span")
ActionChains(browser).click(element).perform()
browse_categories(14, 20)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[21]/span/span")
ActionChains(browser).click(element).perform()
browse_categories(3, 21)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[23]/span/span")
ActionChains(browser).click(element).perform()
browse_categories(5, 23)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[24]/span/span")
ActionChains(browser).click(element).perform()
browse_categories(3, 24)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[25]/span/span")
ActionChains(browser).click(element).perform()
browse_categories(9, 25)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[26]/span/span")
ActionChains(browser).click(element).perform()
browse_categories(4, 26)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[1]/div/aside/div/div[2]/div[4]/div[1]/div/nav/ul/li[27]/span/span")
ActionChains(browser).click(element).perform()
browse_categories(10, 27)


product.to_excel('K:\Thesis\sk.xlsx')
