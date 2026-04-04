import Foundation

final class SampleEventProvider: EventProvider {
    let sourceName: String

    private let decoder: JSONDecoder
    private let bundle: Bundle

    init(sourceName: String, bundle: Bundle = .main) {
        self.sourceName = sourceName
        self.bundle = bundle
        self.decoder = JSONDecoder()
        self.decoder.dateDecodingStrategy = .iso8601
    }

    func fetchEvents() async throws -> [Event] {
        guard let url = bundle.url(forResource: "events", withExtension: "json", subdirectory: "SampleData")
            ?? bundle.url(forResource: "events", withExtension: "json") else {
            throw NSError(domain: "SampleEventProvider", code: 404, userInfo: [NSLocalizedDescriptionKey: "events.json not found in bundle"])
        }

        let data = try Data(contentsOf: url)
        let all = try decoder.decode([Event].self, from: data)
        return all.filter { $0.source.localizedCaseInsensitiveContains(sourceName) }
    }
}
