import time as t
import pandas as pd
import self as self
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains
import urllib
from bs4 import BeautifulSoup as BS

#this code only works for chalkaidakis

def scroll_down(driver): #function to scroll to the bottom of the page
    lenOfPage = browser.execute_script("window.scrollTo(0, document.body.scrollHeight);var lenOfPage=document.body.scrollHeight;return lenOfPage;")
    match=False
    while(match==False):
        lastCount = lenOfPage
        t.sleep(10) #wait for lazy scrolling
        lenOfPage = driver.execute_script("window.scrollTo(0, document.body.scrollHeight);var lenOfPage=document.body.scrollHeight;return lenOfPage;")
        if lastCount==lenOfPage: #we've hit the end of the page
            match=True


def ParseProdList(prlist, category_name): # function to catalog each item and its description
    for i in prlist:
        #print(i.get_attribute('innerHTML'))
        global product
        global new

        new['category'] = category_name
        new['name'] = i.find_element_by_class_name("woocommerce-loop-product__title").text

        if not i.find_elements_by_class_name("brandname"):
            new['brand'] = 'OOS'
        else:
            new['brand'] = i.find_element_by_class_name("brandname").text

        if not i.find_elements_by_class_name("price"):
            new['ppu'] = 'OOS'
        else:
            new['ppu'] = i.find_element_by_class_name("price").text

        # if not i.find_elements_by_class_name("kilo-price"):
        #     new['supp'] = 'NA'
        # else:
        #     new['supp'] = i.find_element_by_class_name("kilo-price").text

        product = product.append(new, ignore_index=True)
    print(product)

def browse_categories(cat_name):

    flag = True
    while(flag):
        scroll_down(browser)

        prodlist = browser.find_elements_by_class_name("type-product")
        # print(prodlist)
        ParseProdList(prodlist, cat_name)
        flag = browser.find_elements_by_class_name("next.page-numbers")
        if(flag):
            next_page = browser.find_element_by_class_name("next.page-numbers")
            # ActionChains(browser).move_to_element(next_page).perform()
            ActionChains(browser).click(next_page).perform()

    browser.find_element_by_tag_name('body').send_keys(Keys.CONTROL + Keys.HOME)


product = pd.DataFrame({},index=[0])
product['category'] = ''
product['brand'] = ''
product['name'] = ''
product['ppu'] = '' #price per unit
# product['supp'] = '' # supplementary price
new = product

browser = webdriver.Firefox(executable_path=r'K:\Thesis\geckodriver')
browser.get('https://eshop.xalkiadakis.gr/')

t.sleep(10)
element = browser.find_element_by_xpath("/html/body/div[2]/div[1]/div/div/div[1]/button") # address
ActionChains(browser).click(element).perform()

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[2]/header/div/div[3]/div/nav/div[1]/div/ul/li[1]/a") # cookie policy
ActionChains(browser).click(element).perform()
t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[2]/header/div/div[2]/div/div/div[2]/div/form/div[1]/input[1]")
ActionChains(browser).click(element).perform()

# find each item category and browse through them with the browse_categories funtion

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[2]/div[2]/div/div/div/main/div/div[1]/div[2]/div/div/ul/li[1]/a")
cat_name = element.text
ActionChains(browser).click(element).perform()
browse_categories(cat_name)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[2]/div[2]/div/div/div/main/div/div[1]/div[2]/div/div/ul/li[2]/a")
cat_name = element.text
ActionChains(browser).click(element).perform()
browse_categories(cat_name)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[2]/div[2]/div/div/div/main/div/div[1]/div[2]/div/div/ul/li[3]/a")
cat_name = element.text
ActionChains(browser).click(element).perform()
browse_categories(cat_name)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[2]/div[2]/div/div/div/main/div/div[1]/div[2]/div/div/ul/li[4]/a")
cat_name = element.text
ActionChains(browser).click(element).perform()
browse_categories(cat_name)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[2]/div[2]/div/div/div/main/div/div[1]/div[2]/div/div/ul/li[5]/a")
cat_name = element.text
ActionChains(browser).click(element).perform()
browse_categories(cat_name)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[2]/div[2]/div/div/div/main/div/div[1]/div[2]/div/div/ul/li[6]/a")
cat_name = element.text
ActionChains(browser).click(element).perform()
browse_categories(cat_name)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[2]/div[2]/div/div/div/main/div/div[1]/div[2]/div/div/ul/li[7]/a")
cat_name = element.text
ActionChains(browser).click(element).perform()
browse_categories(cat_name)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[2]/div[2]/div/div/div/main/div/div[1]/div[2]/div/div/ul/li[8]/a")
cat_name = element.text
ActionChains(browser).click(element).perform()
browse_categories(cat_name)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[2]/div[2]/div/div/div/main/div/div[1]/div[2]/div/div/ul/li[9]/a")
cat_name = element.text
ActionChains(browser).click(element).perform()
browse_categories(cat_name)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[2]/div[2]/div/div/div/main/div/div[1]/div[2]/div/div/ul/li[10]/a")
cat_name = element.text
ActionChains(browser).click(element).perform()
browse_categories(cat_name)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[2]/div[2]/div/div/div/main/div/div[1]/div[2]/div/div/ul/li[11]/a")
cat_name = element.text
ActionChains(browser).click(element).perform()
browse_categories(cat_name)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[2]/div[2]/div/div/div/main/div/div[1]/div[2]/div/div/ul/li[12]/a")
cat_name = element.text
ActionChains(browser).click(element).perform()
browse_categories(cat_name)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[2]/div[2]/div/div/div/main/div/div[1]/div[2]/div/div/ul/li[13]/a")
cat_name = element.text
ActionChains(browser).click(element).perform()
browse_categories(cat_name)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[2]/div[2]/div/div/div/main/div/div[1]/div[2]/div/div/ul/li[14]/a")
cat_name = element.text
ActionChains(browser).click(element).perform()
browse_categories(cat_name)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[2]/div[2]/div/div/div/main/div/div[1]/div[2]/div/div/ul/li[15]/a")
cat_name = element.text
ActionChains(browser).click(element).perform()
browse_categories(cat_name)

t.sleep(8)
element = browser.find_element_by_xpath("/html/body/div[2]/div[2]/div/div/div/main/div/div[1]/div[2]/div/div/ul/li[16]/a")
cat_name = element.text
ActionChains(browser).click(element).perform()
browse_categories(cat_name)


product.to_excel('K:\Thesis\Chalkiadakis.xlsx')
