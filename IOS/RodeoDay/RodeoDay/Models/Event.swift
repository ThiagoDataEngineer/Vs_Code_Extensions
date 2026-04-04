import Foundation

enum EventType: String, Codable, CaseIterable, Identifiable {
    case rodeo
    case auction

    var id: String { rawValue }
}

struct Event: Identifiable, Codable, Hashable {
    let id: UUID
    let title: String
    let type: EventType
    let source: String
    let country: String
    let stateOrRegion: String
    let city: String
    let startsAt: Date
    let venue: String
    let officialUrl: URL?
    let latitude: Double?
    let longitude: Double?

    var locationLabel: String {
        "\(city), \(stateOrRegion), \(country)"
    }
}
