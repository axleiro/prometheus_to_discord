module.exports = {
   "PromothiusAPI" : "http://34.82.168.48:9090/api/v1/query_range",
   "Step" : "60s",
   "SlackToken" : "xoxb-2185412500337-2545801542050-M8P4IvLpDLW2ZRhFMlewwFAj",
   "SlackChannel" : "C02GE1FFG9F"
}


// 100 * (1 - (((avg_over_time(node_memory_MemFree_bytes{instance=~'HOSTTOKEN',job=~'JOBTOKEN'}[1m])) + sort_desc(avg_over_time(node_memory_Cached_bytes{instance=~'HOSTTOKEN',job=~'JOBTOKEN'}[1m])) + sort_desc(avg_over_time(node_memory_Buffers_bytes{instance=~'HOSTTOKEN',job=~'JOBTOKEN'}[1m]))) / avg_over_time(node_memory_MemTotal_bytes{instance=~'HOSTTOKEN',job=~'JOBTOKEN'}[1m])))

// avg_over_time(node_memory_MemTotal_bytes{instance=~'34.82.168.48:9100',job=~'Metrics'}[1m]) - ((avg_over_time(node_memory_MemFree_bytes{instance=~'34.82.168.48:9100',job=~'Metrics'}[1m])) + sort_desc(avg_over_time(node_memory_Cached_bytes{instance=~'34.82.168.48:9100',job=~'Metrics'}[1m])) + sort_desc(avg_over_time(node_memory_Buffers_bytes{instance=~'34.82.168.48:9100',job=~'Metrics'}[1m])))

// min_over_time(node_memory_MemTotal_bytes{instance=~'HOSTTOKEN',job=~'JOBTOKEN'}[1m]) - (min_over_time(node_memory_MemFree_bytes{instance=~'HOSTTOKEN',job=~'JOBTOKEN'}[1m]) + min_over_time(node_memory_Cached_bytes{instance=~'HOSTTOKEN',job=~'JOBTOKEN'}[1m]) + min_over_time(node_memory_Buffers_bytes{instance=~'HOSTTOKEN',job=~'JOBTOKEN'}[1m]))

// max_over_time(node_memory_MemTotal_bytes{instance=~'HOSTTOKEN',job=~'JOBTOKEN'}[1m]) - (max_over_time(node_memory_MemFree_bytes{instance=~'HOSTTOKEN',job=~'JOBTOKEN'}[1m]) + max_over_time(node_memory_Cached_bytes{instance=~'HOSTTOKEN',job=~'JOBTOKEN'}[1m]) + max_over_time(node_memory_Buffers_bytes{instance=~'HOSTTOKEN',job=~'JOBTOKEN'}[1m]))

// quantile_over_time(0.95,node_memory_MemTotal_bytes{instance=~'HOSTTOKEN',job=~'JOBTOKEN'}[1m]) - (quantile_over_time(0.95,node_memory_MemFree_bytes{instance=~'HOSTTOKEN',job=~'JOBTOKEN'}[1m]) + quantile_over_time(0.95,node_memory_Cached_bytes{instance=~'HOSTTOKEN',job=~'JOBTOKEN'}[1m]) + quantile_over_time(0.95,node_memory_Buffers_bytes{instance=~'HOSTTOKEN',job=~'JOBTOKEN'}[1m]))

// quantile_over_time(0.99,node_memory_MemTotal_bytes{instance=~'HOSTTOKEN',job=~'JOBTOKEN'}[1m]) - (quantile_over_time(0.99,node_memory_MemFree_bytes{instance=~'HOSTTOKEN',job=~'JOBTOKEN'}[1m]) + quantile_over_time(0.99,node_memory_Cached_bytes{instance=~'HOSTTOKEN',job=~'JOBTOKEN'}[1m]) + quantile_over_time(0.99,node_memory_Buffers_bytes{instance=~'HOSTTOKEN',job=~'JOBTOKEN'}[1m]))

// (((count(count(node_cpu_seconds_total{instance=~'HOSTTOKEN',job=~'JOBTOKEN'}) by (cpu))) - avg(sum by (mode)(irate(node_cpu_seconds_total{mode='idle',instance=~'HOSTTOKEN',job=~'JOBTOKEN'}[5m])))) * 100) / count(count(node_cpu_seconds_total{instance=~'HOSTTOKEN',job=~'JOBTOKEN'}) by (cpu))

// sum(sum(quantile_over_time(0.95,node_cpu_seconds_total{instance=~'34.82.168.48:9100',job=~'Metrics'}[5m])) by (cpu))

// (sum(sum(quantile_over_time(0.95,node_cpu_seconds_total{instance=~'34.82.168.48:9100',job=~'Metrics'}[5m])) by (cpu)) - sum(quantile_over_time(0.95,node_cpu_seconds_total{mode='idle',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m])))

// ((sum(sum(quantile_over_time(0.95,node_cpu_seconds_total{instance=~'34.82.168.48:9100',job=~'Metrics'}[5m])) by (cpu)) - avg(sum by (mode)(quantile_over_time(0.95,node_cpu_seconds_total{mode='idle',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m])))) / sum(sum(quantile_over_time(0.95,node_cpu_seconds_total{instance=~'34.82.168.48:9100',job=~'Metrics'}[5m])) by (cpu))) * (count(count(node_cpu_seconds_total{instance=~'34.82.168.48:9100',job=~'Metrics'}) by (cpu)))





// ((count(count(node_cpu_seconds_total{instance=~'34.82.168.48:9100',job=~'Metrics'}) by (cpu))) - avg(sum by (mode)(quantile_over_time(0.95,node_cpu_seconds_total{mode='idle',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m]))) * 100)
// ((count(count(node_cpu_seconds_total{instance=~'34.82.168.48:9100',job=~'Metrics'}) by (cpu))) ) * 100
// avg(sum by (mode)(quantile_over_time(0.95,node_cpu_seconds_total{mode='idle',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m])))
// avg(sum by (mode)(irate(node_cpu_seconds_total{mode='idle',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m])))
// (((count(count(node_cpu_seconds_total{instance=~'34.82.168.48:9100',job=~'Metrics'}) by (cpu))) ) * 100)- avg(sum by (mode)(irate(node_cpu_seconds_total{mode='idle',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m])))

// quantile(1,(sum by (mode)(quantile_over_time(0.95,node_cpu_seconds_total{mode='idle',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m]))))

// # testing:
// avg(sum by (mode)(irate(node_cpu_seconds_total{mode='iowait',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m]))) + avg(sum by (mode) (quantile(1,(node_cpu_seconds_total{mode='irq',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m])))) + avg(sum by (mode)(quantile(1, (node_cpu_seconds_total{mode='nice',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m])))) + avg(sum by (mode)(quantile(1, (node_cpu_seconds_total{mode='softirq',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m])))) + avg(sum by (mode)(quantile(1, (node_cpu_seconds_total{mode='steal',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m])))) + avg(sum by (mode)(quantile(1, (node_cpu_seconds_total{mode='system',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m])))) + avg(sum by (mode)(quantile(1, (node_cpu_seconds_total{mode='user',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m])))) - avg(sum by (mode)(quantile(1, (node_cpu_seconds_total{mode='idle',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m]))))
// avg(sum by (mode)(irate(node_cpu_seconds_total{mode='iowait',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m]))) + avg(sum by (mode)(irate(node_cpu_seconds_total{mode='irq',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m]))) + avg(sum by (mode)(irate(node_cpu_seconds_total{mode='nice',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m]))) + avg(sum by (mode)(irate(node_cpu_seconds_total{mode='softirq',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m]))) + avg(sum by (mode)(irate(node_cpu_seconds_total{mode='steal',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m]))) + avg(sum by (mode)(irate(node_cpu_seconds_total{mode='system',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m]))) + avg(sum by (mode)(irate(node_cpu_seconds_total{mode='user',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m]))) - avg(sum by (mode)(irate(node_cpu_seconds_total{mode='idle',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m])))

// # correct_logic{working}:
// avg(sum by (mode)(quantile_over_time(1,node_cpu_seconds_total{mode='iowait',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m]))) + avg(sum by (mode)(quantile_over_time(1,node_cpu_seconds_total{mode='irq',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m]))) + avg(sum by (mode)(quantile_over_time(1,node_cpu_seconds_total{mode='nice',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m]))) + avg(sum by (mode)(quantile_over_time(1,node_cpu_seconds_total{mode='softirq',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m]))) + avg(sum by (mode)(quantile_over_time(1,node_cpu_seconds_total{mode='steal',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m]))) + avg(sum by (mode)(quantile_over_time(1,node_cpu_seconds_total{mode='system',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m]))) +avg(sum by (mode)(quantile_over_time(1,node_cpu_seconds_total{mode='user',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m]))) - avg(sum by (mode)(quantile_over_time(1,node_cpu_seconds_total{mode='idle',instance=~'34.82.168.48:9100',job=~'Metrics'}[5m])))