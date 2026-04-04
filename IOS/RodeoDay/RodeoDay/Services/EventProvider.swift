import Foundation

protocol EventProvider {
    var sourceName: String { get }
    func fetchEvents() async throws -> [Event]
}
