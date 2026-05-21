import { memo, useCallback, useMemo, useState } from 'react'

const arraysData = [1, 2, 3, 4, 5, 6, 7, 8, 9 , 10]

 const Index = memo(({ array }) => {
    // memo if no props don't rerender the components if the parent rerender 
    // but if any state change in the component the change will be rerender the component

    // الميمو لو مفيهاش بروبس يبقي مش هتتغير مادام الاب هو اللي اتعمله
    //  ريريندر لكن لو هو اتغير فيه حاجة بيتعمله ريريندر لكن لما يكون في ستيت يبقي هتتغير لما يتغير 

    const [count, setCount] = useState(0)
    array = arraysData ;
    const handleLoop = (arrays) => {
        // This log helps you see when the expensive calculation actually runs
        console.log("Loop executed! 🚀")
        let arr = []
        for (let i = 0; i < arrays.length; i++) {
            arr.push(arrays[i] * 2)
        }
        return arr;
    }

    // useMemo caches the result and only re-runs handleLoop if arraysData changes
    const result2 = handleLoop(arraysData);


    const result = useMemo(() => {
        return handleLoop(arraysData)
        // ال useMemo احنا هنا بنستخدمها في استدعاء الفانكشن و بترجع في فاريابل
    }, [arraysData])

    console.log(result)
    return (
        <div className="p-8 flex flex-col gap-4 items-start">
            <div className="text-lg font-bold">
                Result: [{result.join(' , ')}]
            </div>

            <div className="text-gray-600">
                Current Count: {count}
            </div>

            <button
                onClick={() => setCount(count + 1)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
                Click to Re-render
            </button>

            <p className="text-sm text-gray-400">
                Open the Console (F12) to see how many times "Loop executed" appears.
            </p>
        </div>
    )
}
 )
export default Index ;