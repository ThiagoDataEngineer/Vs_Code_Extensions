import Foundation

final class GlobalAggregatorService {
    private let providers: [EventProvider]

    init(providers: [EventProvider] = [
        SampleEventProvider(sourceName: "PRCA"),
        SampleEventProvider(sourceName: "PBR"),
        SampleEventProvider(sourceName: "ABQM")
    ]) {
        self.providers = providers
    }

    func fetchAllEvents() async -> [Event] {
        await withTaskGroup(of: [Event].self, returning: [Event].self) { group in
            for provider in providers {
                group.addTask {
                    (try? await provider.fetchEvents()) ?? []
                }
            }

            var merged: [Event] = []
            for await events in group {
                merged.append(contentsOf: events)
            }

            return merged.sorted { $0.startsAt < $1.startsAt }
        }
    }
}
