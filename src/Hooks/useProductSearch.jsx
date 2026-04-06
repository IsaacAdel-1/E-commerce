import { useNavigate } from "react-router-dom";
import { useEffect , useRef   } from "react";
const useProductSearch = (search , query)=>{
    const navigate = useNavigate();
    const cacheRef = useRef(new Map());
    // Map as object to put the words that have searched on it and it's products ,
    //  cacheRef is Ref not state because we need this data still exist after rerendering
    const debounceRef = useRef(null);
    // debounceRef for getting the setTimeout
    const abortRef = useRef(null);
    // abortRef to put the AbortController on it

    useEffect(() => {
        if (!search || search.trim().length === 0) {
                query([]);
                return;
            }
    
            // Here I put the search to trim to get ride of the space before and after
            //Then Split the string by one or more whitespace characters (spaces, tabs, newlines)
            const words = search.trim().split(/\s+/).filter(Boolean);
    
            // I put the products i get before in cachedProducts so I send it to the home page if there is no fetch
            const cachedProducts = [];
            // if the search word doesn't exist in the cacheRef I put it in the wordsToFetch to fetch it
            const wordsToFetch = [];
    
            for (const word of words) {
                const key = word.toLowerCase();
                if (cacheRef.current.has(key)) {
                    cachedProducts.push(...cacheRef.current.get(key));
                } else {
                    wordsToFetch.push(key);
                }
            }
    
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
            // debounceRef has a time 300ms after the time end the code in debounceRef (setTimeout) will execute 
            // when user write a letter "Search" is changing so useEffect starts again 
    
            debounceRef.current = setTimeout(async () => {
                /*
                          لما تعمل fetch(...) في JavaScript:
          
                          هو بيشتغل Asynchronous (يعني بيروح يبعت الـ request ويكمل عادي).
          
                           المتصفح مش بيوقف الـفيتش القديم لوحده حتى لو انت عملت  ريكويست تاني بعده.
          
                           النتيجة = تلاقي أكتر من ريكويست شغالين في نفس الوقت (القديم والجديد).
                           
                           طبعاً الحل اني اوقفه في البداية بالابورت كونترولر
                      */
    
                if (abortRef.current) {
                    abortRef.current.abort();
                    abortRef.current = null;
                }
                // بنقفل ال fetch
                //  لما نتأكد اننا داخلين علي عملية جديدة او بمعني اصح فيه فيتش بالفعل هيحصل
                //  فاحنا مش هنوقف كل ما يتغير حرف احنا هنوقف لما يتغيير حرف و كمان ال 300 ميللي ثانية يعدوا 
    
    
    
                // make a controller
                const controller = new AbortController();
                // the abortRef to get the controller to abort it before starting the fetch to end the fetch starting before
                abortRef.current = controller;
                try {
                    const fetchedResults = [];
                    if (wordsToFetch.length > 0) {
                        const fetchProducts = wordsToFetch.map((w) => {
                            return fetch(
                                `https://dummyjson.com/products/search?q=${encodeURIComponent(
                                    w
                                )}`,
                                { signal: controller.signal }
                            ).then((res) => {
                                if (!res.ok) {
                                    throw new Error("Request failed");
                                }
    
                                return res.json();
                            });
                        });
    
                        const fetchData = await Promise.allSettled(fetchProducts);
                        /*
                              عندنا Promise.all , Promise.allSettled 
                              all --> بترجع كل البروميسيس 
                              allSettled --> بترجع كل البروميسيس اللي اتحققت سواء بالفلود او الريجكت
                              هنا انا عايز كل البروميسيس اللي اتحققت سواء بالفلود
                              او الريجكت عشان لو في مشكلة في فيتش كلمة معينة مش توقف الفيتش كله
                              */
    
                        // In this loop i take the word key from wordsToFetch and the products from fetchData
                        // I put all of them in the cacheRef Map it's works by key so no products will be repeated
    
                        fetchData.forEach((prod, indx) => {
                            const key = wordsToFetch[indx];
                            if (
                                prod.status === "fulfilled" &&
                                prod.value &&
                                Array.isArray(prod.value.products)
                            ) {
                                const products = prod.value.products;
                                cacheRef.current.set(key, products);
                                fetchedResults.push(...products);
                            }
                        });
                        // Now we have fetchedResults and cachedProducts have all the products the user want
                        // cachedProducts from the cashRef , fetchedResults from the fetchData
                        /* it's necessary to put dots before the arrays because if i don't put it 
                                 the shap will be like [[prod1 , prod2],[prod3 , prod4]]
                                 every array will be as single array in a big array 
                                 and I put the dots it's be like I take every item in the big array                
                              */
                    }
                    const allProducts = [...cachedProducts, ...fetchedResults];
    
                    const UniqueProducts = new Map();
    
                    for (const p of allProducts) {
                        if (p && p.id != null && !UniqueProducts.has(p.id)) {
                            UniqueProducts.set(p.id, p);
                        }
                    }
                    query(Array.from(UniqueProducts.values()));
                    navigate(`/shop`);
                } catch (err) {
                    if (err.name == "AbortError") {
                        console.log("Abort Error");
                    } else {
                        console.log(err + " Erorr");
                    }
                } finally {
                    if (abortRef.current == controller) {
                        abortRef.current = null;
                    }
                    if (debounceRef.current) {
                        debounceRef.current = null;
                    }
                    /*
                            لو الفيتش نجح او فشل هيدخل علي الفاينلي مادام محصل انمونت او ريرن يبقي  الريترن اللي هي الكلين اب مش هتشتغل اصلاً 
                            ليه بقي لانها هتشتغل بس لما يحصل ريرن او انمونت 
                            */
                }
            }, 300);
    
            return () => {
                // ****** First thing start in useEffect ******
                // 1) نظف التايمر
                if (debounceRef.current) {
                    clearTimeout(debounceRef.current);
                    debounceRef.current = null; // reset reference (اختياري لكنه كويس)
                    // we have to cleanup the time if the user goes to another page
                    // this won't ever cleanup if i don't do that and that will take a Usage of the memory
                }
    
                // 2) أوقف أي fetch شغال الآن
                if (abortRef.current) {
                    abortRef.current.abort(); // <-- هذا السطر المضاف لإلغاء الفيتش
                    abortRef.current = null; // ازالة المرجع بعد الabort لسلامة الذاكرة
                }
            };
    
            // 🧠 useEffect always creates "side effects" (timers, fetch, subscriptions, etc).
            //    If we don't clean them up, they stay in memory even after the component unmounts.
            //    This can cause "memory leaks".
    
            // ⏱️ Example: setTimeout / setInterval
            //    - Each timer reserves memory inside the browser until it's cleared.
            //    - If we forget to call clearTimeout/clearInterval, the timer keeps running forever,
            //      even if the component is gone.
    
            // 🌐 Example: fetch with AbortController
            //    - A fetch request stays alive until it completes or is aborted.
            //    - If the component unmounts before fetch finishes, the response will try to update state,
            //      but the component no longer exists → React shows a warning.
            //    - Aborting the fetch prevents this and frees memory immediately.
    
            // 🧹 Cleanup function in useEffect
            //    - The "return () => { ... }" part in useEffect is called when:
            //        1) The component unmounts.
            //        2) Or before the effect re-runs (because dependencies changed).
            //    - In cleanup, we cancel timers, abort fetches, and remove event listeners.
            //    - This keeps memory usage small and avoids leaks.
    
            // 💡 Rule of thumb:
            //    Always clean up anything that "lives outside" React's normal render cycle.
        }, [search , query]);
}

export default useProductSearch ;