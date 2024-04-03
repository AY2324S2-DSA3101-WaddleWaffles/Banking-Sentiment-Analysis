from datetime import date, datetime
from dateutil.relativedelta import relativedelta
from flask import Flask, jsonify, request
from flask_cors import CORS

import calendar

app = Flask(__name__)
CORS(app)

# Sample data
customer_reviews = [
    {"year": 2022, "month": 8, "day": 1, "bank": "GXS", "title": "Excellent service", "review": "I have been using GXS for a while now and I must say, their service is top-notch. Transactions are smooth and customer support is very helpful.", "rating": 5, "sentiment": "Positive", "topic": "interface", "source": "appstore", "associations": ["service", "smooth", "helpful"]},
    {"year": 2022, "month": 8, "day": 5, "bank": "DBS", "title": "App keeps crashing", "review": "The DBS app keeps crashing whenever I try to use it. It's frustrating because I rely on it for my banking needs. Please fix this issue as soon as possible.", "rating": 2, "sentiment": "Negative", "topic": "bug", "source": "playstore", "associations": ["crashing", "frustrating", "fix"]},
    {"year": 2022, "month": 8, "day": 10, "bank": "Trust", "title": "Smooth experience", "review": "Trust's app provides a smooth banking experience. I can easily manage my accounts and make transactions without any hassle.", "rating": 4, "sentiment": "Positive", "topic": "interface", "source": "appstore", "associations": ["smooth", "manage", "transactions"]},
    {"year": 2022, "month": 8, "day": 15, "bank": "UOB", "title": "Great user interface", "review": "UOB's app has a great user interface that is easy to navigate. I love how everything is organized and accessible.", "rating": 5, "sentiment": "Positive", "topic": "interface", "source": "playstore", "associations": ["user interface", "navigate", "organized"]},
    {"year": 2022, "month": 8, "day": 20, "bank": "OCBC", "title": "Disappointed", "review": "I'm disappointed with OCBC's service. The app is slow and unresponsive, making it difficult to carry out transactions.", "rating": 2, "sentiment": "Negative", "topic": "interface", "source": "appstore", "associations": ["disappointed", "slow", "unresponsive"]},
    {"year": 2022, "month": 8, "day": 25, "bank": "MariBank", "title": "Not impressed", "review": "I'm not impressed with MariBank's app. It lacks many features that other banking apps offer. Needs improvement.", "rating": 3, "sentiment": "Negative", "topic": "features", "source": "playstore", "associations": ["impressed", "lacks", "improvement"]},
    {"year": 2022, "month": 9, "day": 1, "bank": "GXS", "title": "Great app overall", "review": "GXS's app is great overall. It's user-friendly and efficient. Haven't encountered any major issues so far.", "rating": 5, "sentiment": "Positive", "topic": "interface", "source": "playstore", "associations": ["user-friendly", "efficient", "issues"]},
    {"year": 2022, "month": 9, "day": 5, "bank": "DBS", "title": "Convenient", "review": "DBS's app is very convenient for managing my finances on the go. I appreciate the features like mobile check deposit.", "rating": 4, "sentiment": "Positive", "topic": "features", "source": "appstore", "associations": ["convenient", "managing", "finances"]},
    {"year": 2022, "month": 9, "day": 10, "bank": "OCBC", "title": "Improved performance", "review": "OCBC's app has significantly improved in terms of performance. It's much faster and responsive now.", "rating": 4, "sentiment": "Positive", "topic": "update", "source": "playstore", "associations": ["improved", "performance", "faster"]},
    {"year": 2022, "month": 9, "day": 15, "bank": "UOB", "title": "Easy to use", "review": "UOB's app is easy to use and intuitive. I haven't faced any issues while using it for my banking needs.", "rating": 5, "sentiment": "Positive", "topic": "interface", "source": "appstore", "associations": ["easy", "intuitive", "issues"]},
    {"year": 2022, "month": 9, "day": 20, "bank": "OCBC", "title": "Needs improvement", "review": "OCBC's app needs improvement in terms of user experience. It's not as user-friendly as other banking apps.", "rating": 3, "sentiment": "Negative", "topic": "interface", "source": "playstore", "associations": ["improvement", "user experience", "user-friendly"]},
    {"year": 2022, "month": 9, "day": 25, "bank": "MariBank", "title": "Satisfactory", "review": "MariBank's app provides a satisfactory experience overall. However, there are some minor glitches that need fixing.", "rating": 4, "sentiment": "Neutral", "topic": "bug", "source": "appstore", "associations": ["satisfactory", "glitches", "fixing"]},
    {"year": 2022, "month": 10, "day": 1, "bank": "GXS", "title": "Smooth transactions", "review": "I love how smooth transactions are with GXS's app. It saves me a lot of time and hassle.", "rating": 5, "sentiment": "Positive", "topic": "transaction", "source": "playstore", "associations": ["smooth", "transactions", "time"]},
    {"year": 2022, "month": 10, "day": 5, "bank": "DBS", "title": "User-friendly interface", "review": "DBS's app has a user-friendly interface that makes banking tasks easier. I appreciate the design and layout.", "rating": 5, "sentiment": "Positive", "topic": "interface", "source": "appstore", "associations": ["user-friendly", "design", "layout"]},
    {"year": 2022, "month": 10, "day": 10, "bank": "OCBC", "title": "Responsive customer support", "review": "OCBC's customer support is very responsive and helpful. They assisted me promptly when I encountered an issue with my account.", "rating": 5, "sentiment": "Positive", "topic": "customer support", "source": "playstore", "associations": ["responsive", "helpful", "promptly"]},
    {"year": 2022, "month": 10, "day": 15, "bank": "Trust", "title": "Reliable app", "review": "Trust's app is reliable and efficient. I haven't experienced any downtime or errors while using it.", "rating": 5, "sentiment": "Positive", "topic": "reliability", "source": "appstore", "associations": ["reliable", "efficient", "downtime"]},
    {"year": 2022, "month": 10, "day": 20, "bank": "OCBC", "title": "Lacking features", "review": "OCBC's app lacks some features that would make banking more convenient. It needs to catch up with competitors in terms of functionality.", "rating": 3, "sentiment": "Negative", "topic": "features", "source": "playstore", "associations": ["lacking", "convenient", "functionality"]},
    {"year": 2022, "month": 10, "day": 25, "bank": "MariBank", "title": "Decent app", "review": "MariBank's app is decent but could use some improvements in terms of speed. Overall, it gets the job done.", "rating": 4, "sentiment": "Neutral", "topic": "speed", "source": "appstore", "associations": ["decent", "improvements", "speed"]},
    {"year": 2022, "month": 11, "day": 1, "bank": "GXS", "title": "Excellent service", "review": "GXS continues to provide excellent service through their app. I have never encountered any major issues.", "rating": 5, "sentiment": "Positive", "topic": "service", "source": "playstore", "associations": ["excellent", "service", "issues"]},
    {"year": 2022, "month": 11, "day": 5, "bank": "DBS", "title": "Frustrating experience", "review": "I'm frustrated with the constant errors and glitches in DBS's app. It's affecting my banking tasks negatively.", "rating": 2, "sentiment": "Negative", "topic": "bug", "source": "appstore", "associations": ["frustrating", "errors", "glitches"]},
    {"year": 2022, "month": 11, "day": 10, "bank": "OCBC", "title": "Improved app", "review": "OCBC's app has improved significantly since the last update. It's much more stable and responsive now.", "rating": 4, "sentiment": "Positive", "topic": "update", "source": "playstore", "associations": ["improved", "stable", "responsive"]},
    {"year": 2022, "month": 11, "day": 15, "bank": "Trust", "title": "User-friendly design", "review": "Trust's app has a user-friendly design that makes it easy to navigate. I appreciate the simplicity.", "rating": 5, "sentiment": "Positive", "topic": "interface", "source": "appstore", "associations": ["user-friendly", "design", "simplicity"]},
    {"year": 2022, "month": 11, "day": 20, "bank": "DBS", "title": "Poor performance", "review": "DBS's app performance has been poor lately. It's slow and often crashes during transactions.", "rating": 2, "sentiment": "Negative", "topic": "performance", "source": "playstore", "associations": ["poor", "slow", "crashes"]},
    {"year": 2022, "month": 11, "day": 25, "bank": "MariBank", "title": "Needs more features", "review": "MariBank's app needs to introduce more features to compete with other banking apps. It feels outdated.", "rating": 3, "sentiment": "Negative", "topic": "features", "source": "appstore", "associations": ["needs", "features", "outdated"]},
    {"year": 2022, "month": 12, "day": 1, "bank": "GXS", "title": "Satisfied customer", "review": "I'm a satisfied customer of GXS. Their app has made banking hassle-free for me.", "rating": 4, "sentiment": "Positive", "topic": "service", "source": "playstore", "associations": ["satisfied", "customer", "hassle-free"]},
    {"year": 2022, "month": 12, "day": 5, "bank": "DBS", "title": "Great features", "review": "DBS's app offers great features that enhance my banking experience. I particularly like the budgeting tools.", "rating": 5, "sentiment": "Positive", "topic": "features", "source": "appstore", "associations": ["great", "features", "budgeting"]},
    {"year": 2022, "month": 12, "day": 10, "bank": "OCBC", "title": "Responsive app", "review": "OCBC's app is very responsive and easy to use. I haven't encountered any issues so far.", "rating": 5, "sentiment": "Positive", "topic": "interface", "source": "playstore", "associations": ["responsive", "easy", "issues"]},
    {"year": 2022, "month": 12, "day": 15, "bank": "Trust", "title": "Efficient transactions", "review": "Trust's app facilitates efficient transactions. It's quick and reliable.", "rating": 5, "sentiment": "Positive", "topic": "transaction", "source": "appstore", "associations": ["efficient", "transactions", "quick"]},
    {"year": 2022, "month": 12, "day": 20, "bank": "DBS", "title": "Unsatisfactory experience", "review": "I had an unsatisfactory experience with DBS's app. It's not user-friendly and lacks essential features.", "rating": 2, "sentiment": "Negative", "topic": "interface", "source": "playstore", "associations": ["unsatisfactory", "user-friendly", "lacks"]},
    {"year": 2022, "month": 12, "day": 25, "bank": "MariBank", "title": "Decent but could be better", "review": "MariBank's app is decent, but it could be better with more features and a smoother interface.", "rating": 3, "sentiment": "Neutral", "topic": "interface", "source": "appstore", "associations": ["decent", "features", "smoother"]},
    {"year": 2023, "month": 1, "day": 1, "bank": "GXS", "title": "Smooth banking experience", "review": "GXS's app provides a smooth banking experience. I haven't faced any issues so far.", "rating": 5, "sentiment": "Positive", "topic": "interface", "source": "playstore", "associations": ["smooth", "banking", "issues"]},
    {"year": 2023, "month": 1, "day": 5, "bank": "DBS", "title": "App constantly crashes", "review": "The DBS app constantly crashes, making it difficult to carry out transactions. This needs immediate attention.", "rating": 2, "sentiment": "Negative", "topic": "bug", "source": "appstore", "associations": ["constantly crashes", "difficult", "attention"]},
    {"year": 2023, "month": 1, "day": 10, "bank": "OCBC", "title": "Improved stability", "review": "OCBC's app has improved in stability recently. I haven't experienced any crashes or errors.", "rating": 4, "sentiment": "Positive", "topic": "update", "source": "playstore", "associations": ["improved", "stability", "crashes"]},
    {"year": 2023, "month": 1, "day": 15, "bank": "UOB", "title": "Intuitive design", "review": "UOB's app has an intuitive design that makes banking tasks easier. I appreciate the effort put into making it user-friendly.", "rating": 5, "sentiment": "Positive", "topic": "interface", "source": "appstore", "associations": ["intuitive", "design", "user-friendly"]},
    {"year": 2023, "month": 1, "day": 20, "bank": "DBS", "title": "Disappointing app", "review": "DBS's app is disappointing. It lacks essential features and the interface is confusing.", "rating": 2, "sentiment": "Negative", "topic": "interface", "source": "playstore", "associations": ["disappointing", "lacks", "confusing"]},
    {"year": 2023, "month": 1, "day": 25, "bank": "MariBank", "title": "Average performance", "review": "MariBank's app performance is average. It could be better with some optimizations.", "rating": 3, "sentiment": "Neutral", "topic": "performance", "source": "appstore", "associations": ["average", "optimizations", "better"]},
    {"year": 2023, "month": 2, "day": 1, "bank": "GXS", "title": "Highly recommended", "review": "I highly recommend GXS's app to anyone looking for a reliable banking solution. It's been a great experience so far.", "rating": 5, "sentiment": "Positive", "topic": "service", "source": "playstore", "associations": ["recommended", "reliable", "experience"]},
    {"year": 2023, "month": 2, "day": 5, "bank": "DBS", "title": "Frequent crashes", "review": "The DBS app crashes frequently, especially during important transactions. It's frustrating and needs to be fixed urgently.", "rating": 2, "sentiment": "Negative", "topic": "bug", "source": "appstore", "associations": ["frequent crashes", "frustrating", "urgent"]},
    {"year": 2023, "month": 2, "day": 10, "bank": "OCBC", "title": "Smooth operations", "review": "OCBC's app ensures smooth banking operations. I haven't faced any major issues since I started using it.", "rating": 5, "sentiment": "Positive", "topic": "interface", "source": "playstore", "associations": ["smooth", "operations", "issues"]},
    {"year": 2023, "month": 2, "day": 15, "bank": "UOB", "title": "Great customer support", "review": "UOB's customer support is excellent. They resolved my query promptly and efficiently.", "rating": 5, "sentiment": "Positive", "topic": "customer support", "source": "appstore", "associations": ["great", "customer support", "resolved"]},
    {"year": 2023, "month": 2, "day": 20, "bank": "DBS", "title": "Improvements needed", "review": "DBS's app needs significant improvements. It's not up to par with other banking apps in terms of functionality.", "rating": 3, "sentiment": "Negative", "topic": "features", "source": "playstore", "associations": ["improvements", "functionality", "par"]},
    {"year": 2023, "month": 2, "day": 25, "bank": "MariBank", "title": "Decent app", "review": "MariBank's app is decent but could be more user-friendly. Some features are hard to find.", "rating": 3, "sentiment": "Neutral", "topic": "interface", "source": "appstore", "associations": ["decent", "user-friendly", "features"]},
    {"year": 2023, "month": 3, "day": 1, "bank": "GXS", "title": "Efficient service", "review": "GXS provides efficient service through their app. It's convenient and reliable.", "rating": 5, "sentiment": "Positive", "topic": "service", "source": "playstore", "associations": ["efficient", "service", "convenient"]},
    {"year": 2023, "month": 3, "day": 5, "bank": "DBS", "title": "Disappointing experience", "review": "My experience with DBS's app has been disappointing. It's slow and prone to errors.", "rating": 2, "sentiment": "Negative", "topic": "performance", "source": "appstore", "associations": ["disappointing", "slow", "errors"]},
    {"year": 2023, "month": 3, "day": 10, "bank": "OCBC", "title": "Satisfied customer", "review": "I'm a satisfied customer of OCBC's app. It meets all my banking needs effectively.", "rating": 4, "sentiment": "Positive", "topic": "service", "source": "playstore", "associations": ["satisfied", "customer", "banking"]},
    {"year": 2023, "month": 3, "day": 15, "bank": "UOB", "title": "User-friendly interface", "review": "UOB's app has a user-friendly interface that makes banking tasks a breeze. Highly recommended.", "rating": 5, "sentiment": "Positive", "topic": "interface", "source": "appstore", "associations": ["user-friendly", "interface", "recommended"]},
    {"year": 2023, "month": 3, "day": 20, "bank": "DBS", "title": "Needs improvement", "review": "DBS's app needs improvement, especially in terms of performance. It's laggy and unresponsive at times.", "rating": 3, "sentiment": "Negative", "topic": "performance", "source": "playstore", "associations": ["improvement", "performance", "laggy"]},
    {"year": 2023, "month": 3, "day": 25, "bank": "MariBank", "title": "Average app", "review": "MariBank's app is average. It does the job but lacks some advanced features.", "rating": 3, "sentiment": "Neutral", "topic": "features", "source": "appstore", "associations": ["average", "job", "features"]},
    {"year": 2023, "month": 4, "day": 1, "bank": "GXS", "title": "Excellent app", "review": "GXS's app is excellent. It's fast, reliable, and user-friendly. Couldn't ask for more.", "rating": 5, "sentiment": "Positive", "topic": "interface", "source": "playstore", "associations": ["excellent", "fast", "reliable"]},
    {"year": 2023, "month": 4, "day": 5, "bank": "DBS", "title": "Unresponsive app", "review": "DBS's app has been unresponsive lately. It freezes frequently and makes banking tasks frustrating.", "rating": 2, "sentiment": "Negative", "topic": "performance", "source": "appstore", "associations": ["unresponsive", "freezes", "frustrating"]},
    {"year": 2023, "month": 4, "day": 10, "bank": "OCBC", "title": "Smooth experience", "review": "OCBC's app provides a smooth banking experience. Transactions are quick and hassle-free.", "rating": 5, "sentiment": "Positive", "topic": "transaction", "source": "playstore", "associations": ["smooth", "transactions", "hassle-free"]},
    {"year": 2023, "month": 4, "day": 15, "bank": "UOB", "title": "Reliable app", "review": "UOB's app is reliable and efficient. It's my go-to platform for all banking needs.", "rating": 5, "sentiment": "Positive", "topic": "reliability", "source": "appstore", "associations": ["reliable", "efficient", "platform"]},
    {"year": 2023, "month": 4, "day": 20, "bank": "DBS", "title": "Below expectations", "review": "DBS's app is below my expectations. It lacks many features that I need for managing my finances.", "rating": 2, "sentiment": "Negative", "topic": "features", "source": "playstore", "associations": ["below", "expectations", "managing"]},
    {"year": 2023, "month": 4, "day": 25, "bank": "MariBank", "title": "Room for improvement", "review": "MariBank's app has room for improvement. It's decent but could be better with more features.", "rating": 3, "sentiment": "Neutral", "topic": "features", "source": "appstore", "associations": ["room", "improvement", "features"]},
    {"year": 2023, "month": 4, "day": 30, "bank": "Trust", "title": "Best banking app", "review": "Trust's app is hands down the best banking app I've used. It's fast, reliable, and packed with useful features.", "rating": 5, "sentiment": "Positive", "topic": "features", "source": "playstore", "associations": ["best", "fast", "reliable"]},
    {"year": 2023, "month": 5, "day": 5, "bank": "DBS", "title": "Improved stability", "review": "DBS's app has become more stable in recent updates. It no longer crashes as frequently as before.", "rating": 4, "sentiment": "Positive", "topic": "update", "source": "appstore", "associations": ["improved", "stability", "crashes"]},
    {"year": 2023, "month": 5, "day": 10, "bank": "OCBC", "title": "Convenient app", "review": "OCBC's app offers great convenience with its easy-to-use interface. I can perform transactions quickly and efficiently.", "rating": 5, "sentiment": "Positive", "topic": "interface", "source": "playstore", "associations": ["convenient", "easy-to-use", "transactions"]},
    {"year": 2023, "month": 5, "day": 15, "bank": "UOB", "title": "User-friendly design", "review": "UOB's app has a user-friendly design that makes banking tasks a breeze. It's intuitive and easy to navigate.", "rating": 5, "sentiment": "Positive", "topic": "interface", "source": "appstore", "associations": ["user-friendly", "design", "intuitive"]},
    {"year": 2023, "month": 5, "day": 20, "bank": "Trust", "title": "App needs improvement", "review": "Trust's app could use some improvement in terms of performance. It's a bit slow compared to other banking apps.", "rating": 3, "sentiment": "Negative", "topic": "performance", "source": "playstore", "associations": ["improvement", "performance", "slow"]},
    {"year": 2023, "month": 5, "day": 25, "bank": "MariBank", "title": "Decent app", "review": "MariBank's app is decent overall. It lacks some advanced features but gets the job done.", "rating": 3, "sentiment": "Neutral", "topic": "features", "source": "appstore", "associations": ["decent", "features", "job"]},
    {"year": 2023, "month": 6, "day": 1, "bank": "Trust", "title": "Exceptional service", "review": "Trust's service is exceptional. Their app is a testament to their commitment to customer satisfaction.", "rating": 5, "sentiment": "Positive", "topic": "service", "source": "playstore", "associations": ["exceptional", "service", "commitment"]},
    {"year": 2023, "month": 6, "day": 5, "bank": "DBS", "title": "Frequent crashes", "review": "DBS's app crashes frequently, especially during peak hours. It's frustrating and needs urgent fixing.", "rating": 2, "sentiment": "Negative", "topic": "bug", "source": "appstore", "associations": ["frequent crashes", "frustrating", "urgent"]},
    {"year": 2023, "month": 6, "day": 10, "bank": "OCBC", "title": "Smooth experience", "review": "OCBC's app provides a smooth banking experience. Transactions are quick, and the interface is user-friendly.", "rating": 5, "sentiment": "Positive", "topic": "transaction", "source": "playstore", "associations": ["smooth", "transactions", "user-friendly"]},
    {"year": 2023, "month": 6, "day": 15, "bank": "UOB", "title": "Reliable app", "review": "UOB's app is reliable and efficient. It's my go-to platform for all banking needs.", "rating": 5, "sentiment": "Positive", "topic": "reliability", "source": "appstore", "associations": ["reliable", "efficient", "platform"]},
    {"year": 2023, "month": 6, "day": 20, "bank": "Trust", "title": "Below expectations", "review": "Trust's app falls below my expectations. It lacks many features that are crucial for everyday banking.", "rating": 2, "sentiment": "Negative", "topic": "features", "source": "playstore", "associations": ["below", "expectations", "crucial"]},
    {"year": 2023, "month": 6, "day": 25, "bank": "MariBank", "title": "Average performance", "review": "MariBank's app performance is average. It could be better with some optimization.", "rating": 3, "sentiment": "Neutral", "topic": "performance", "source": "appstore", "associations": ["average", "optimization", "better"]},
    {"year": 2023, "month": 7, "day": 1, "bank": "GXS", "title": "Great app", "review": "GXS's app is great. It's user-friendly and efficient, making banking tasks a breeze.", "rating": 5, "sentiment": "Positive", "topic": "interface", "source": "playstore", "associations": ["great", "user-friendly", "efficient"]},
    {"year": 2023, "month": 7, "day": 5, "bank": "DBS", "title": "Unreliable app", "review": "DBS's app has been unreliable lately. It freezes often and makes transactions difficult.", "rating": 2, "sentiment": "Negative", "topic": "performance", "source": "appstore", "associations": ["unreliable", "freezes", "difficult"]},
    {"year": 2023, "month": 7, "day": 10, "bank": "OCBC", "title": "Smooth operations", "review": "OCBC's app ensures smooth banking operations. I haven't faced any major issues since I started using it.", "rating": 5, "sentiment": "Positive", "topic": "transaction", "source": "playstore", "associations": ["smooth", "banking", "issues"]},
    {"year": 2023, "month": 7, "day": 15, "bank": "UOB", "title": "Efficient app", "review": "UOB's app is efficient and reliable. It's my go-to platform for all banking needs.", "rating": 5, "sentiment": "Positive", "topic": "reliability", "source": "appstore", "associations": ["efficient", "reliable", "platform"]},
    {"year": 2023, "month": 7, "day": 20, "bank": "GXS", "title": "Below expectations", "review": "GXS's app is below my expectations. It lacks many features that are crucial for everyday banking.", "rating": 2, "sentiment": "Negative", "topic": "features", "source": "playstore", "associations": ["below", "expectations", "crucial"]},
    {"year": 2023, "month": 7, "day": 25, "bank": "MariBank", "title": "Room for improvement", "review": "MariBank's app has room for improvement. It's decent but could be better with more features.", "rating": 3, "sentiment": "Neutral", "topic": "features", "source": "appstore", "associations": ["room", "improvement", "features"]},
    {"year": 2023, "month": 8, "day": 1, "bank": "GXS", "title": "Exceptional service", "review": "GXS's service is exceptional. Their app is a testament to their commitment to customer satisfaction.", "rating": 5, "sentiment": "Positive", "topic": "service", "source": "playstore", "associations": ["exceptional", "service", "commitment"]},
    {"year": 2023, "month": 8, "day": 5, "bank": "DBS", "title": "Frequent crashes", "review": "DBS's app crashes frequently, especially during peak hours. It's frustrating and needs urgent fixing.", "rating": 2, "sentiment": "Negative", "topic": "bug", "source": "appstore", "associations": ["frequent crashes", "frustrating", "urgent"]},
    {"year": 2023, "month": 8, "day": 10, "bank": "OCBC", "title": "Smooth experience", "review": "OCBC's app provides a smooth banking experience. Transactions are quick, and the interface is user-friendly.", "rating": 5, "sentiment": "Positive", "topic": "transaction", "source": "playstore", "associations": ["smooth", "transactions", "user-friendly"]},
    {"year": 2023, "month": 8, "day": 15, "bank": "UOB", "title": "Reliable app", "review": "UOB's app is reliable and efficient. It's my go-to platform for all banking needs.", "rating": 5, "sentiment": "Positive", "topic": "reliability", "source": "appstore", "associations": ["reliable", "efficient", "platform"]},
    {"year": 2023, "month": 8, "day": 20, "bank": "GXS", "title": "Below expectations", "review": "GXS's app falls below my expectations. It lacks many features that are crucial for everyday banking.", "rating": 2, "sentiment": "Negative", "topic": "features", "source": "playstore", "associations": ["below", "expectations", "crucial"]},
    {"year": 2023, "month": 8, "day": 25, "bank": "MariBank", "title": "Room for improvement", "review": "MariBank's app has room for improvement. It's decent but could be better with more features.", "rating": 3, "sentiment": "Neutral", "topic": "features", "source": "appstore", "associations": ["room", "improvement", "features"]},
    {"year": 2023, "month": 9, "day": 1, "bank": "GXS", "title": "Great app", "review": "GXS's app is great. It's user-friendly and efficient, making banking tasks a breeze.", "rating": 5, "sentiment": "Positive", "topic": "interface", "source": "playstore", "associations": ["great", "user-friendly", "efficient"]},
    {"year": 2023, "month": 9, "day": 5, "bank": "DBS", "title": "Unreliable app", "review": "DBS's app has been unreliable lately. It freezes often and makes transactions difficult.", "rating": 2, "sentiment": "Negative", "topic": "performance", "source": "appstore", "associations": ["unreliable", "freezes", "difficult"]},
    {"year": 2023, "month": 9, "day": 10, "bank": "OCBC", "title": "Smooth operations", "review": "OCBC's app ensures smooth banking operations. I haven't faced any major issues since I started using it.", "rating": 5, "sentiment": "Positive", "topic": "transaction", "source": "playstore", "associations": ["smooth", "banking", "issues"]},
    {"year": 2023, "month": 9, "day": 15, "bank": "UOB", "title": "Efficient app", "review": "UOB's app is efficient and reliable. It's my go-to platform for all banking needs.", "rating": 5, "sentiment": "Positive", "topic": "reliability", "source": "appstore", "associations": ["efficient", "reliable", "platform"]},
    {"year": 2023, "month": 9, "day": 20, "bank": "GXS", "title": "Below expectations", "review": "GXS's app falls below my expectations. It lacks many features that are crucial for everyday banking.", "rating": 2, "sentiment": "Negative", "topic": "features", "source": "playstore", "associations": ["below", "expectations", "crucial"]},
    {"year": 2023, "month": 9, "day": 25, "bank": "MariBank", "title": "Room for improvement", "review": "MariBank's app has room for improvement. It's decent but could be better with more features.", "rating": 3, "sentiment": "Neutral", "topic": "features", "source": "appstore", "associations": ["room", "improvement", "features"]},
    {"year": 2023, "month": 10, "day": 1, "bank": "GXS", "title": "Great app", "review": "GXS's app is great. It's user-friendly and efficient, making banking tasks a breeze.", "rating": 5, "sentiment": "Positive", "topic": "interface", "source": "playstore", "associations": ["great", "user-friendly", "efficient"]},
    {"year": 2023, "month": 10, "day": 5, "bank": "DBS", "title": "Unreliable app", "review": "DBS's app has been unreliable lately. It freezes often and makes transactions difficult.", "rating": 2, "sentiment": "Negative", "topic": "performance", "source": "appstore", "associations": ["unreliable", "freezes", "difficult"]},
    {"year": 2023, "month": 10, "day": 10, "bank": "MariBank", "title": "Smooth operations", "review": "MariBank's app ensures smooth banking operations. I haven't faced any major issues since I started using it.", "rating": 5, "sentiment": "Positive", "topic": "transaction", "source": "playstore", "associations": ["smooth", "banking", "issues"]},
    {"year": 2023, "month": 10, "day": 15, "bank": "UOB", "title": "Efficient app", "review": "UOB's app is efficient and reliable. It's my go-to platform for all banking needs.", "rating": 5, "sentiment": "Positive", "topic": "reliability", "source": "appstore", "associations": ["efficient", "reliable", "platform"]},
    {"year": 2023, "month": 10, "day": 20, "bank": "GXS", "title": "Below expectations", "review": "GXS's app falls below my expectations. It lacks many features that are crucial for everyday banking.", "rating": 2, "sentiment": "Negative", "topic": "features", "source": "playstore", "associations": ["below", "expectations", "crucial"]},
    {"year": 2023, "month": 10, "day": 25, "bank": "OCBC", "title": "Room for improvement", "review": "OCBC's app has room for improvement. It's decent but could be better with more features.", "rating": 3, "sentiment": "Neutral", "topic": "features", "source": "appstore", "associations": ["room", "improvement", "features"]},
    {"year": 2023, "month": 11, "day": 1, "bank": "GXS", "title": "Great app", "review": "GXS's app is great. It's user-friendly and efficient, making banking tasks a breeze.", "rating": 5, "sentiment": "Positive", "topic": "interface", "source": "playstore", "associations": ["great", "user-friendly", "efficient"]},
    {"year": 2023, "month": 11, "day": 5, "bank": "DBS", "title": "Unreliable app", "review": "DBS's app has been unreliable lately. It freezes often and makes transactions difficult.", "rating": 2, "sentiment": "Negative", "topic": "performance", "source": "appstore", "associations": ["unreliable", "freezes", "difficult"]},
    {"year": 2023, "month": 11, "day": 10, "bank": "OCBC", "title": "Smooth operations", "review": "OCBC's app ensures smooth banking operations. I haven't faced any major issues since I started using it.", "rating": 5, "sentiment": "Positive", "topic": "transaction", "source": "playstore", "associations": ["smooth", "banking", "issues"]},
    {"year": 2023, "month": 11, "day": 15, "bank": "UOB", "title": "Efficient app", "review": "UOB's app is efficient and reliable. It's my go-to platform for all banking needs.", "rating": 5, "sentiment": "Positive", "topic": "reliability", "source": "appstore", "associations": ["efficient", "reliable", "platform"]},
    {"year": 2023, "month": 11, "day": 20, "bank": "Trust", "title": "Below expectations", "review": "Trust's app falls below my expectations. It lacks many features that are crucial for everyday banking.", "rating": 2, "sentiment": "Negative", "topic": "features", "source": "playstore", "associations": ["below", "expectations", "crucial"]},
    {"year": 2023, "month": 11, "day": 25, "bank": "MariBank", "title": "Room for improvement", "review": "MariBank's app has room for improvement. It's decent but could be better with more features.", "rating": 3, "sentiment": "Neutral", "topic": "features", "source": "appstore", "associations": ["room", "improvement", "features"]},
    {"year": 2023, "month": 12, "day": 1, "bank": "GXS", "title": "Great app", "review": "GXS's app is great. It's user-friendly and efficient, making banking tasks a breeze.", "rating": 5, "sentiment": "Positive", "topic": "interface", "source": "playstore", "associations": ["great", "user-friendly", "efficient"]},
    {"year": 2023, "month": 12, "day": 5, "bank": "DBS", "title": "Unreliable app", "review": "DBS's app has been unreliable lately. It freezes often and makes transactions difficult.", "rating": 2, "sentiment": "Negative", "topic": "performance", "source": "appstore", "associations": ["unreliable", "freezes", "difficult"]},
    {"year": 2023, "month": 12, "day": 10, "bank": "OCBC", "title": "Smooth operations", "review": "OCBC's app ensures smooth banking operations. I haven't faced any major issues since I started using it.", "rating": 5, "sentiment": "Positive", "topic": "transaction", "source": "playstore", "associations": ["smooth", "banking", "issues"]},
    {"year": 2023, "month": 12, "day": 15, "bank": "UOB", "title": "Efficient app", "review": "UOB's app is efficient and reliable. It's my go-to platform for all banking needs.", "rating": 5, "sentiment": "Positive", "topic": "reliability", "source": "appstore", "associations": ["efficient", "reliable", "platform"]},
    {"year": 2023, "month": 12, "day": 20, "bank": "Trust", "title": "Below expectations", "review": "Trust's app falls below my expectations. It lacks many features that are crucial for everyday banking.", "rating": 2, "sentiment": "Negative", "topic": "features", "source": "playstore", "associations": ["below", "expectations", "crucial"]},
    {"year": 2023, "month": 12, "day": 25, "bank": "MariBank", "title": "Room for improvement", "review": "MariBank's app has room for improvement. It's decent but could be better with more features.", "rating": 3, "sentiment": "Neutral", "topic": "features", "source": "appstore", "associations": ["room", "improvement", "features"]},
    {"year": 2024, "month": 1, "day": 1, "bank": "GXS", "title": "Great service", "review": "GXS's service is great. The app is easy to use and makes banking convenient.", "rating": 5, "sentiment": "Positive", "topic": "service", "source": "playstore", "associations": ["great", "service", "convenient"]},
    {"year": 2024, "month": 1, "day": 5, "bank": "UOB", "title": "App needs fixing", "review": "UOB's app needs fixing. It crashes frequently and makes banking tasks difficult.", "rating": 2, "sentiment": "Negative", "topic": "bug", "source": "appstore", "associations": ["needs fixing", "frequently", "difficult"]},
    {"year": 2024, "month": 1, "day": 10, "bank": "OCBC", "title": "Efficient app", "review": "OCBC's app is efficient and user-friendly. It's my preferred choice for banking.", "rating": 5, "sentiment": "Positive", "topic": "interface", "source": "playstore", "associations": ["efficient", "user-friendly", "preferred"]},
    {"year": 2024, "month": 1, "day": 15, "bank": "DBS", "title": "Smooth transactions", "review": "DBS's app ensures smooth transactions every time. It's reliable and fast.", "rating": 5, "sentiment": "Positive", "topic": "transaction", "source": "appstore", "associations": ["smooth", "transactions", "reliable"]},
    {"year": 2024, "month": 1, "day": 20, "bank": "Trust", "title": "Disappointing app", "review": "Trust's app is disappointing. It lacks essential features and is not user-friendly.", "rating": 2, "sentiment": "Negative", "topic": "interface", "source": "playstore", "associations": ["disappointing", "lacks", "user-friendly"]},
    {"year": 2024, "month": 1, "day": 25, "bank": "MariBank", "title": "Average app", "review": "MariBank's app is average. It could be better with more features and improvements.", "rating": 3, "sentiment": "Neutral", "topic": "features", "source": "appstore", "associations": ["average", "features", "improvements"]},
    {"year": 2024, "month": 2, "day": 1, "bank": "MariBank", "title": "Exceptional service", "review": "MariBank's service is exceptional. The app is intuitive and makes banking hassle-free.", "rating": 5, "sentiment": "Positive", "topic": "service", "source": "playstore", "associations": ["exceptional", "service", "intuitive"]},
    {"year": 2024, "month": 2, "day": 5, "bank": "DBS", "title": "App crashing frequently", "review": "The DBS app keeps crashing frequently, making it nearly impossible to use. This needs urgent attention.", "rating": 2, "sentiment": "Negative", "topic": "bug", "source": "appstore", "associations": ["crashing frequently", "impossible", "urgent"]},
    {"year": 2024, "month": 2, "day": 10, "bank": "Trust", "title": "Highly reliable", "review": "Trust's app is highly reliable. I haven't encountered any issues since I started using it.", "rating": 5, "sentiment": "Positive", "topic": "reliability", "source": "playstore", "associations": ["highly reliable", "issues", "using"]},
    {"year": 2024, "month": 2, "day": 15, "bank": "UOB", "title": "Simplified banking", "review": "UOB's app simplifies banking tasks with its intuitive interface. Highly recommended for anyone looking for convenience.", "rating": 5, "sentiment": "Positive", "topic": "interface", "source": "appstore", "associations": ["simplified", "banking", "recommended"]},
    {"year": 2024, "month": 2, "day": 20, "bank": "OCBC", "title": "Needs major improvements", "review": "OCBC's app needs major improvements to compete with other banking apps. It's outdated and lacks many modern features.", "rating": 2, "sentiment": "Negative", "topic": "features", "source": "playstore", "associations": ["needs improvements", "compete", "outdated"]},
    {"year": 2024, "month": 2, "day": 25, "bank": "GXS", "title": "Average app", "review": "GXS's app is average. It could be better with more features and a smoother interface.", "rating": 3, "sentiment": "Neutral", "topic": "interface", "source": "appstore", "associations": ["average", "features", "smoother"]},
    {"year": 2024, "month": 3, "day": 1, "bank": "GXS", "title": "Great app", "review": "GXS's app is great. It's user-friendly and efficient, making banking tasks a breeze.", "rating": 5, "sentiment": "Positive", "topic": "interface", "source": "playstore", "associations": ["great", "user-friendly", "efficient"]},
    {"year": 2024, "month": 3, "day": 5, "bank": "DBS", "title": "Unreliable app", "review": "DBS's app has been unreliable lately. It freezes often and makes transactions difficult.", "rating": 2, "sentiment": "Negative", "topic": "performance", "source": "appstore", "associations": ["unreliable", "freezes", "difficult"]},
    {"year": 2024, "month": 3, "day": 10, "bank": "OCBC", "title": "Smooth operations", "review": "OCBC's app ensures smooth banking operations. I haven't faced any major issues since I started using it.", "rating": 5, "sentiment": "Positive", "topic": "transaction", "source": "playstore", "associations": ["smooth", "banking", "issues"]},
    {"year": 2024, "month": 3, "day": 15, "bank": "UOB", "title": "Efficient app", "review": "UOB's app is efficient and reliable. It's my go-to platform for all banking needs.", "rating": 5, "sentiment": "Positive", "topic": "reliability", "source": "appstore", "associations": ["efficient", "reliable", "platform"]},
    {"year": 2024, "month": 3, "day": 20, "bank": "Trust", "title": "Below expectations", "review": "Trust's app is below my expectations. It lacks many features that I need for managing my finances.", "rating": 2, "sentiment": "Negative", "topic": "features", "source": "playstore", "associations": ["below", "expectations", "managing"]},
    {"year": 2024, "month": 3, "day": 25, "bank": "MariBank", "title": "Room for improvement", "review": "MariBank's app has room for improvement. It's decent but could be better with more features.", "rating": 3, "sentiment": "Neutral", "topic": "features", "source": "appstore", "associations": ["room", "improvement", "features"]}
    ]

@app.route("/latest-day", methods=["GET"])
def get_latest_day():
    return jsonify({"latest_day": str(datetime.now().date())})

@app.route("/reviews/topics", methods=["GET"])
def get_all_topics():
    topics = {"topics": list(set(map(lambda x: x["topic"], customer_reviews)))}
    return jsonify(topics)

@app.route("/reviews/topics-sentiment", methods=["GET"])
def get_sentiment_by_topic():
    input_start_date, input_end_date = request.args.get("start-date"), request.args.get("end-date")
    start_date = datetime.strptime(input_start_date, "%d-%m-%Y").date() if input_start_date else date(2000, 1, 1)
    end_date = datetime.strptime(input_end_date, "%d-%m-%Y").date() if input_end_date else datetime.now().date()

    topic_sentiments = {}
    for review in customer_reviews:
        review_date = date(review["year"], review["month"], review["day"])
        if start_date > review_date or end_date < review_date:
            continue

        topic = review["topic"]
        if topic not in topic_sentiments:
            topic_sentiments[topic] = {"Positive": 0, "Neutral": 0, "Negative": 0}

        topic_sentiments[topic][review["sentiment"]] += 1
    
    for topic in topic_sentiments:
        review_count = sum(topic_sentiments[topic].values())
        topic_sentiments[topic] = {sentiment: round(amount / review_count, 3) for sentiment, amount in topic_sentiments[topic].items()}
    
    return jsonify(topic_sentiments)

@app.route("/reviews/average-rating", methods=["GET"])
def get_average_rating():
    # Expect only one duration (in months), will write exception in the future, default to 3 months if not indicated
    duration_months = request.args.getlist("duration")
    duration_months = 3 if not duration_months else int(duration_months[0])

    input_start_date, input_end_date = request.args.get("start-date"), request.args.get("end-date")
    if input_start_date or input_end_date:
        start_date = datetime.strptime(input_start_date, "%d-%m-%Y").date() if input_start_date else date(2000, 1, 1)
        end_date = datetime.strptime(input_end_date, "%d-%m-%Y").date() if input_end_date else datetime.now().date()
    else:
        start_date, end_date = datetime.now().date() - relativedelta(months=duration_months), datetime.now().date()
    
    ratings = {}
    for review in customer_reviews:
        bank = review["bank"]
        if bank not in ratings:
            ratings[bank] = {"total": [0, 0]}

        review_date = date(review["year"], review["month"], review["day"])
        if start_date <= review_date <= end_date:
            ratings[bank]["total"][0] += review["rating"]
            ratings[bank]["total"][1] += 1

            month = review_date.strftime("%m-%Y")
            if month not in ratings[bank]:
                ratings[bank][month] = [0, 0]
            ratings[bank][month][0] += review["rating"]
            ratings[bank][month][1] += 1

    for bank in ratings:
        print(ratings[bank])
        for month in ratings[bank]:
            summed_rating, count = ratings[bank][month]
            ratings[bank][month] = round(summed_rating / count, 3)
    return jsonify(ratings)

@app.route("/reviews/months-sentiment", methods=["GET"])
def get_month_specific_sentiment():
    # Expect only one bank, will write exception in the future, default to GXS if not indicated
    bank = request.args.getlist("bank")
    bank = "GXS" if not bank else bank[0]

    sentiments = {}
    for review in customer_reviews:
        month = calendar.month_name[review["month"]]
        sentiment = review["sentiment"]
        if review["bank"] != bank:
            continue
        if month not in sentiments:
            sentiments[month] = {"Positive": 0, "Neutral": 0, "Negative": 0}

        sentiments[month][sentiment] += 1
    
    for month in sentiments:
        total_count = sum(sentiments[month].values())
        sentiments[month] = {month: round(amount / total_count, 3) for month, amount in sentiments[month].items()}

    for month_val in range(1, 13):
        month = calendar.month_name[month_val]
        sentiments[month] = sentiments.get(month, {"Positive": 0, "Neutral": 0, "Negative": 0})
    sentiments["bank"] = bank
    return jsonify(sentiments)

@app.route("/reviews/word-associations", methods=["GET"])
def get_word_associations():
    input_start_date, input_end_date = request.args.get("start-date"), request.args.get("end-date")
    start_date = datetime.strptime(input_start_date, "%d-%m-%Y").date() if input_start_date else date(2000, 1, 1)
    end_date = datetime.strptime(input_end_date, "%d-%m-%Y").date() if input_end_date else datetime.now().date()

    bank = request.args.get("bank")
    bank = "GXS" if not bank else bank

    associations = {}
    for review in customer_reviews:
        review_date = date(review["year"], review["month"], review["day"])
        if review["bank"] != bank or start_date > review_date or end_date < review_date:
            continue

        review_date = date(review["year"], review["month"], review["day"])
        topic = review["topic"]
        asssociation_words = review["associations"]
        if topic not in associations:
            associations[topic] = {}

        for word in asssociation_words:
            associations[topic][word] = associations[topic].get(word, 0) + 1

    for topic in associations:
        top_associations = sorted(associations[topic].items(), key=lambda x: x[1], reverse=True)[:5]
        associations[topic] = {key: value for key, value in top_associations}
    return jsonify(associations)


@app.route("/reviews/period-sentiment", methods=["GET"])
def get_period_specific_sentiment():
    # Expect only one bank, will write exception in the future, default to GXS if not indicated
    bank = request.args.getlist("bank")
    bank = "GXS" if not bank else bank[0]

    input_start_date, input_end_date = request.args.get("start-date"), request.args.get("end-date")
    start_date = datetime.strptime(input_start_date, "%d-%m-%Y").date() if input_start_date else date(2000, 1, 1)
    end_date = datetime.strptime(input_end_date, "%d-%m-%Y").date() if input_end_date else datetime.now().date()

    sentiments = {"Positive": 0, "Neutral": 0, "Negative": 0}
    for review in customer_reviews:
        review_date = date(review["year"], review["month"], review["day"])
        if review["bank"] != bank or start_date > review_date or end_date < review_date:
            continue
        
        sentiment = review["sentiment"]
        sentiments[sentiment] += 1

    total_count = sum(sentiments.values())
    for sentiment in sentiments:
        sentiments[sentiment] = round(sentiments[sentiment] / total_count, 3)

    sentiments["bank"] = bank
    sentiments["start-date"] = request.args.get("start-date")
    sentiments["end-date"] = request.args.get("end-date")

    return jsonify(sentiments)

@app.route("/reviews/counts", methods=["GET"])
def get_review_counts():
    input_start_date, input_end_date = request.args.get("start-date"), request.args.get("end-date")
    start_date = datetime.strptime(input_start_date, "%d-%m-%Y").date() if input_start_date else date(2000, 1, 1)
    end_date = datetime.strptime(input_end_date, "%d-%m-%Y").date() if input_end_date else datetime.now().date()

    review_counts = {}
    for review in customer_reviews:
        review_date = date(review["year"], review["month"], review["day"])
        if start_date > review_date or end_date < review_date:
            continue

        bank = review["bank"]
        review_counts[bank] = review_counts.get(bank, 0) + 1
    
    return review_counts

@app.route("/reviews/recommendation", methods=["GET"])
def generate_recommendation():
    return jsonify({"recommendation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "\
                    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "\
                    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."})

@app.route("/reviews/insights", methods=["GET"])
def generate_insights():
    return jsonify({"insights": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "\
                    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "\
                    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."})

@app.route("/reviews/donut-chart-data", methods=["GET"])
def get_donut_chart_data():
    # Expect only one bank, will write exception in the future, default to GXS if not indicated
    bank = request.args.getlist("bank")
    bank = "GXS" if not bank else bank[0]

    input_start_date, input_end_date = request.args.get("start-date"), request.args.get("end-date")
    start_date = datetime.strptime(input_start_date, "%d-%m-%Y").date() if input_start_date else datetime.now().date() - relativedelta(months=3)
    end_date = datetime.strptime(input_end_date, "%d-%m-%Y").date() if input_end_date else datetime.now().date()

    sentiments = {"Positive": 0, "Neutral": 0, "Negative": 0}
    for review in customer_reviews:
        review_date = date(review["year"], review["month"], review["day"])
        if review["bank"] != bank or start_date > review_date or end_date < review_date:
            continue
        
        sentiment = review["sentiment"]
        sentiments[sentiment] += 1

    total_count = sum(sentiments.values())
    for sentiment in sentiments:
        sentiments[sentiment] = round(sentiments[sentiment] / total_count, 3)

    colour = {"Positive": "teal.6", "Neutral": "yellow.6", "Negative": "red.6"}
    data = []
    for sentiment, percentage in sentiments.items():
        data.append({"name": sentiment, "value": percentage, "color": colour[sentiment]})
    return jsonify(data)

if __name__ == "__main__":
    app.run(port=5001)
