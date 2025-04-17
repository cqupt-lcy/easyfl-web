export function transformResultsToChartData({results, tasks, taskNames}) {
  const roundMap = new Map()
  for (const [taskid,task] of Object.entries(tasks)) {
    if (!taskNames.includes(task.name)) continue

    const taskResults = results[taskid] || []

    for (const entry of taskResults) {
      const { round, testAcc } = entry
      if (typeof round !== 'number' || typeof testAcc !== 'number') continue

      if (!roundMap.has(round)) {
        roundMap.set(round, { round })
      }

      const roundEntry = roundMap.get(round)
      roundEntry[task.name] = testAcc // 用 name 做图表 key
    }
  }

  return Array.from(roundMap.values()).sort((a, b) => a.round - b.round)
}
